/* ==========================================================================
   Kedah Silver Economy: page controllers
   One init per body[data-page]. Each init binds events once and pushes its
   render functions onto K.onLang, which the shell runs on load and on every
   language switch.
   ========================================================================== */
(function (K) {
'use strict';
var $ = K.$, $$ = K.$$, esc = K.esc;

/* ---------- 01 Overview ---------- */
K.pageInit.overview = function () {
  var svg = $('#constellation'), first = true;
  function go(node) { if (node) location.href = 'network.html#r' + node.getAttribute('data-idx'); }
  svg.addEventListener('click', function (e) { go(e.target.closest('.node')); });
  svg.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { var n = e.target.closest('.node'); if (n) { e.preventDefault(); go(n); } }
  });
  var STATS = {
    ecosystem: { n: String(K.schema.length), l: { en: 'types of data', bm: 'jenis data' } },
    network: { n: K.counts.Verified + ' / ' + K.records.length, l: { en: 'confirmed so far', bm: 'disahkan setakat ini' } },
    scenario: { n: '3', l: { en: 'sample people', bm: 'contoh warga emas' } },
    roadmap: { n: '9', l: { en: 'months, 4 phases', bm: 'bulan, 4 fasa' } },
    evidence: { n: String(K.reviews.length), l: { en: 'reviewer comments', bm: 'ulasan penilai' } }
  };
  K.onLang.push(function () {
    K.viz.constellation(svg, $('#consLegend'), first); first = false;
    $('#walk').innerHTML = K.PAGES.slice(1).map(function (p, i) {
      var s = STATS[p.id];
      return '<a href="' + p.href + '"><span class="no">0' + (i + 2) + K.icon('right') + '</span><b>' + esc(K.L(p.label)) + '</b><p>' + esc(K.L(p.desc)) + '</p>' +
        '<span class="stat"><strong>' + esc(s.n) + '</strong>' + esc(K.L(s.l)) + '</span></a>';
    }).join('');
  });
};

/* ---------- 02 Ecosystem ---------- */
K.pageInit.ecosystem = function () {
  K.onLang.push(function () {
    $('#schema').innerHTML = K.schema.map(function (s) {
      return '<div class="card"><div class="schema-head"><h3>' + esc(K.L(s.t)) + '</h3><span>' + s.f.length + ' ' + K.T('fields', 'medan') + '</span></div><ul class="fields">' +
        s.f.map(function (x, i) {
          var flag = s.key[i];
          return '<li' + (flag ? ' class="key" data-flag="' + esc(K.L(flag)) + '"' : '') + '>' + esc(K.lang === 'bm' ? x[1] : x[0]) + '</li>';
        }).join('') + '</ul></div>';
    }).join('');
  });
};

/* ---------- 03 Supply network ---------- */
K.pageInit.network = function () {
  var tf = $('#typeFilter'), df = $('#districtFilter'), sf = $('#statusFilter');
  var focusIdx = null, m = /^#r(\d+)$/.exec(location.hash || '');
  if (m && K.records[Number(m[1])]) focusIdx = Number(m[1]);

  function renderRecords() {
    var rows = [];
    K.records.forEach(function (r, idx) {
      if ((tf.value === 'all' || r.type === tf.value) && (df.value === 'all' || r.district === df.value) && (sf.value === 'all' || r.status === sf.value)) rows.push(idx);
    });
    $('#records').innerHTML = rows.length ? rows.map(function (idx) {
      var r = K.records[idx], t = K.types[r.type];
      return '<tr id="r' + idx + '"><td class="org">' + esc(r.name) + '</td><td><span class="type"><i style="background:var(--t' + t.c + ')"></i>' + esc(K.L(t.one)) + '</span></td>' +
        '<td>' + esc(r.district) + '</td><td class="cap">' + esc(r.cap) + '</td><td>' + K.pill(r.status) + '</td></tr>';
    }).join('') : '<tr><td colspan="5" class="empty">' + esc(K.T('Nothing matches these filters. Try a wider filter.', 'Tiada padanan untuk penapis ini. Cuba penapis yang lebih luas.')) + '</td></tr>';
    $('#recordCount').textContent = K.T('Showing ' + rows.length + ' of ' + K.records.length, 'Memaparkan ' + rows.length + ' daripada ' + K.records.length);
    K.viz.districtChart($('#districtChart'), tf.value, sf.value, df.value);
  }
  [tf, df, sf].forEach(function (el) { el.addEventListener('change', renderRecords); });

  K.onLang.push(function () {
    $('#statusKeys').innerHTML = K.statusOrder.map(function (s) { return '<li>' + K.pill(s) + '<span>' + esc(K.L(K.status[s].key)) + '</span></li>'; }).join('');
    $('#dLegend').innerHTML = K.statusOrder.map(function (s) { return K.pill(s); }).join('');
    renderRecords();
    if (focusIdx !== null) {
      var row = document.getElementById('r' + focusIdx);
      if (row) {
        row.scrollIntoView({ block: 'center', behavior: K.reduceMotion ? 'auto' : 'smooth' });
        row.classList.add('flash');
      }
      focusIdx = null;
    }
  });
};

/* ---------- 04 Scenario lab ---------- */
K.pageInit.scenario = function () {
  var S = K.scenario, persona = $('#persona'), district = $('#district'), need = $('#need'), income = $('#income');
  var shown = null, raf = 0;

  function setCoverage(v, instant) {
    var el = $('#coverage');
    if (instant || K.reduceMotion || shown === null) { el.textContent = v + '%'; shown = v; return; }
    var a = shown, t0 = performance.now(); shown = v; cancelAnimationFrame(raf);
    (function step(t) {
      var k = Math.min(1, (t - t0) / 340), e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(a + (v - a) * e) + '%';
      if (k < 1) raf = requestAnimationFrame(step);
    })(t0);
  }
  function renderPresets() {
    $('#presetList').innerHTML = S.presets.map(function (p, i) {
      var on = persona.value === p.persona && district.value === p.district && need.value === p.need && Number(income.value) === p.income;
      return '<button class="preset" type="button" data-preset="' + i + '" aria-pressed="' + on + '">' + esc(K.L(p.l)) + '</button>';
    }).join('');
  }
  function update(instant) {
    var pk = persona.value, nk = need.value, p = S.profiles[pk], nd = S.needs[nk];
    var adj = S.districtAdj[district.value] || 0, inc = Math.max(0, Number(income.value) || 0);
    var coverage = Math.max(20, Math.min(96, p.coverage + nd.add + adj));
    if (inc < 1000) coverage = Math.min(96, coverage + 6);
    if (inc > 3000 && nk === 'welfare') coverage -= 8;
    var path = p.path.slice(); if (path.indexOf(nd.step) < 0) path.unshift(nd.step);
    var nodes = p.nodes.slice(); if (nodes.indexOf(nd.node) < 0) nodes.unshift(nd.node);
    var steps = Math.max(2, p.steps + (nd.add < 0 ? 1 : 0) + (adj < 0 ? 1 : 0));
    var gap = p.gap; if (adj < 0) gap = 'district'; if (nd.add < 0) gap = 'capacity';
    var state = coverage > 70 ? 'good' : coverage > 50 ? 'warn' : 'crit';

    setCoverage(coverage, instant);
    $('#coverageBar').style.width = coverage + '%';
    var st = $('#coverageState'); st.className = 'state ' + state; st.innerHTML = '<i aria-hidden="true"></i>' + esc(K.L(S.states[state]));
    $('#matched').textContent = coverage > 70 ? '5 / 5' : coverage > 50 ? '4 / 6' : '3 / 7';
    $('#steps').textContent = steps;
    $('#pathwayList').innerHTML = path.slice(0, 5).map(function (k, i) {
      var pr = k === nd.step;
      return '<li' + (pr ? ' class="is-priority"' : '') + '><span class="n">' + (i + 1) + '</span><span>' + esc(K.L(S.steps[k])) + '</span>' + (pr ? '<em>' + esc(K.T('Main need', 'Keperluan utama')) + '</em>' : '') + '</li>';
    }).join('');
    $('#providerList').innerHTML = nodes.slice(0, 4).map(function (k) { return '<li><span>' + esc(K.L(S.nodes[k].n)) + '</span>' + K.pill(S.nodes[k].s) + '</li>'; }).join('');
    $('#gap').textContent = K.L(S.gaps[gap]);
    renderPresets();
  }
  [persona, district, need, income].forEach(function (el) { el.addEventListener('input', function () { update(false); }); });
  $('#presetList').addEventListener('click', function (e) {
    var b = e.target.closest('[data-preset]'); if (!b) return;
    var p = S.presets[Number(b.getAttribute('data-preset'))];
    persona.value = p.persona; district.value = p.district; need.value = p.need; income.value = p.income;
    update(false);
    var again = $('#presetList [data-preset="' + b.getAttribute('data-preset') + '"]'); if (again) again.focus();
  });
  var firstRun = true;
  K.onLang.push(function () { update(firstRun); firstRun = false; });
};

/* ---------- 05 Roadmap & budget ---------- */
K.pageInit.roadmap = function () {
  K.onLang.push(function () {
    K.viz.roadStatus($('#roadStatus'));
    K.viz.budget($('#budget'));
  });
};

/* ---------- 06 Evidence ---------- */
K.pageInit.evidence = function () {
  K.onLang.push(function () {
    var n = { Verified: 0, Candidate: 0, Demo: 0 };
    K.reviews.forEach(function (r) { n[r.s]++; });
    $('#revSummary').innerHTML = ['Verified', 'Candidate', 'Demo'].map(function (s) {
      return K.pill(s, n[s] + ' · ' + K.L(K.reviewStatus[s]));
    }).join('');
    $('#reviews').innerHTML = K.reviews.map(function (r, i) {
      return '<tr><td class="no">' + (i + 1) + '</td><td class="area">' + esc(K.L(r.area)) + '</td><td class="asked">' + esc(K.L(r.asked)) + '</td>' +
        '<td>' + esc(K.L(r.done)) + '</td><td class="where">' + esc(K.L(r.where)) + '</td><td>' + K.pill(r.s, K.L(K.reviewStatus[r.s])) + '</td></tr>';
    }).join('');
  });
};

})(window.KSE);
