/*
  Try a Case assistance model.  This module is DOM-free so the case shape and
  matching rules can move to SwiftUI and Android Compose later.

  The catalogue is a planning vocabulary, not a medical diagnosis. Provider
  capability rows are sample records until Phase 1 verifies them.
*/
(function (K) {
  'use strict';
  var VERSION = '2026.10.04';
  function t(en, bm) { return { en: en, bm: bm }; }

  var A = { VERSION: VERSION, areas: {}, items: {}, modes: {}, durations: {}, urgency: {} };
  A.modes = {
    borrow: t('Borrow', 'Pinjam'), rent: t('Rent', 'Sewa'), donate: t('Free or donated', 'Percuma atau sumbangan'),
    buy: t('Buy', 'Beli'), fund: t('Help to pay', 'Bantuan bayaran'), monthly: t('Recurring supply', 'Bekalan berulang'),
    service: t('Someone provides the service', 'Ada orang menyediakan perkhidmatan'), refer: t('Referral', 'Rujukan'), unsure: t('Not sure', 'Tidak pasti')
  };
  A.durations = {
    once: t('One time', 'Sekali sahaja'), short: t('Under one month', 'Kurang sebulan'),
    medium: t('1 to 3 months', '1 hingga 3 bulan'), long: t('3 to 12 months', '3 hingga 12 bulan'),
    ongoing: t('Long term or recurring', 'Jangka panjang atau berulang'), unsure: t('Not sure', 'Tidak pasti')
  };
  A.urgency = {
    info: t('Information only', 'Maklumat sahaja'), plan: t('Can plan ahead', 'Boleh dirancang'),
    weeks: t('Within 1 to 2 weeks', 'Dalam 1 hingga 2 minggu'), days: t('Within 1 to 3 days', 'Dalam 1 hingga 3 hari'),
    today: t('Today', 'Hari ini')
  };
  function area(key, en, bm, items) {
    A.areas[key] = { l: t(en, bm), items: items };
    Object.keys(items).forEach(function (itemKey) {
      var row = items[itemKey];
      A.items[itemKey] = { key: itemKey, area: key, l: row[0], kind: row[1], modes: row[2], duration: row[3] };
    });
  }
  area('mobility', 'Mobility equipment', 'Alat bantuan bergerak', {
    wheelchair: [t('Manual wheelchair', 'Kerusi roda manual'), 'equipment', ['borrow','donate','rent','buy','fund','unsure'], 'long'],
    electricWheelchair: [t('Electric wheelchair', 'Kerusi roda elektrik'), 'equipment', ['borrow','rent','buy','fund','unsure'], 'long'],
    walker: [t('Walking frame or walker', 'Rangka berjalan'), 'equipment', ['borrow','donate','buy','fund','unsure'], 'long'],
    walkingStick: [t('Walking stick or quad cane', 'Tongkat'), 'equipment', ['borrow','donate','buy','fund','unsure'], 'long'],
    transferChair: [t('Transfer chair', 'Kerusi pindahan'), 'equipment', ['borrow','rent','buy','fund','unsure'], 'long']
  });
  area('medical', 'Medical and respiratory equipment', 'Peralatan perubatan dan pernafasan', {
    oxygenCylinder: [t('Oxygen cylinder or tank', 'Silinder atau tangki oksigen'), 'equipment', ['borrow','rent','buy','fund','unsure'], 'ongoing'],
    oxygenConcentrator: [t('Oxygen concentrator', 'Penumpu oksigen'), 'equipment', ['rent','buy','fund','unsure'], 'ongoing'],
    nebuliser: [t('Nebuliser', 'Nebuliser'), 'equipment', ['borrow','rent','buy','fund','unsure'], 'long'],
    suctionMachine: [t('Suction machine', 'Mesin sedutan'), 'equipment', ['rent','buy','fund','unsure'], 'long'],
    pulseOximeter: [t('Pulse oximeter', 'Oksimeter nadi'), 'equipment', ['borrow','buy','fund','unsure'], 'long'],
    healthMonitor: [t('Blood pressure or glucose monitor', 'Alat tekanan darah atau gula'), 'equipment', ['borrow','buy','fund','unsure'], 'long']
  });
  area('bedhome', 'Bed, bathroom and home equipment', 'Katil, bilik air dan peralatan rumah', {
    hospitalBed: [t('Hospital bed', 'Katil hospital'), 'equipment', ['borrow','rent','donate','buy','fund','unsure'], 'long'],
    pressureMattress: [t('Pressure-relief mattress', 'Tilam pelega tekanan'), 'equipment', ['borrow','rent','donate','buy','fund','unsure'], 'long'],
    bedRails: [t('Bed rails', 'Palang katil'), 'equipment', ['borrow','buy','fund','unsure'], 'long'],
    patientHoist: [t('Patient hoist or transfer aid', 'Pengangkat pesakit'), 'equipment', ['borrow','rent','buy','fund','unsure'], 'long'],
    showerChair: [t('Shower or commode chair', 'Kerusi mandi atau tandas'), 'equipment', ['borrow','donate','buy','fund','unsure'], 'long'],
    bathroomRails: [t('Bathroom rails or raised toilet seat', 'Pemegang bilik air atau tempat duduk tandas tinggi'), 'home', ['service','fund','refer','unsure'], 'long'],
    ramp: [t('Ramp or safer home modification', 'Tanjakan atau ubah suai rumah'), 'home', ['service','fund','refer','unsure'], 'long']
  });
  area('personal', 'Personal care and continence supplies', 'Bekalan penjagaan diri dan kontinens', {
    adultDiapers: [t('Adult diapers', 'Lampin dewasa'), 'consumable', ['monthly','donate','buy','fund','unsure'], 'ongoing'],
    underpads: [t('Bed underpads', 'Alas tilam'), 'consumable', ['monthly','donate','buy','fund','unsure'], 'ongoing'],
    catheterSupplies: [t('Catheter supplies', 'Bekalan kateter'), 'consumable', ['monthly','donate','buy','fund','unsure'], 'ongoing'],
    woundCare: [t('Wound-care supplies', 'Bekalan rawatan luka'), 'consumable', ['monthly','donate','buy','fund','unsure'], 'ongoing'],
    hygieneSupplies: [t('Hygiene supplies', 'Bekalan kebersihan'), 'consumable', ['monthly','donate','buy','fund','unsure'], 'ongoing']
  });
  area('care', 'Nursing and daily care', 'Rawatan dan penjagaan harian', {
    homeNursing: [t('Home nursing', 'Rawatan di rumah'), 'service', ['service','refer','fund','unsure'], 'medium'],
    personalCarer: [t('Personal caregiver', 'Penjaga peribadi'), 'service', ['service','refer','fund','unsure'], 'ongoing'],
    respiteCare: [t('Respite for the caregiver', 'Rehat untuk penjaga'), 'service', ['service','refer','fund','unsure'], 'short'],
    postHospitalCare: [t('Care after hospital discharge', 'Jagaan selepas keluar hospital'), 'service', ['service','refer','fund','unsure'], 'short'],
    medicationHelp: [t('Medication support', 'Bantuan mengambil ubat'), 'service', ['service','refer','fund','unsure'], 'ongoing'],
    bathingToileting: [t('Bathing or toileting help', 'Bantuan mandi atau ke tandas'), 'service', ['service','refer','fund','unsure'], 'ongoing']
  });
  area('transport', 'Transport and hospital access', 'Pengangkutan dan akses hospital', {
    appointmentTransport: [t('Transport to appointments', 'Pengangkutan ke temu janji'), 'service', ['service','refer','fund','unsure'], 'once'],
    wheelchairTransport: [t('Wheelchair-accessible transport', 'Pengangkutan mesra kerusi roda'), 'service', ['service','refer','fund','unsure'], 'once'],
    dialysisTransport: [t('Dialysis transport', 'Pengangkutan dialisis'), 'service', ['service','refer','fund','unsure'], 'ongoing'],
    hospitalEscort: [t('Hospital escort', 'Teman ke hospital'), 'service', ['service','refer','unsure'], 'once'],
    medicinePickup: [t('Medicine pick-up', 'Ambil ubat'), 'service', ['service','refer','unsure'], 'ongoing']
  });
  area('money', 'Financial and welfare assistance', 'Bantuan kewangan dan kebajikan', {
    monthlyLivingAid: [t('Monthly living assistance', 'Bantuan sara hidup bulanan'), 'money', ['fund','refer','unsure'], 'ongoing'],
    equipmentFunding: [t('Funding for equipment', 'Bantuan membeli peralatan'), 'money', ['fund','refer','unsure'], 'long'],
    medicalBills: [t('Medical bill assistance', 'Bantuan bil perubatan'), 'money', ['fund','refer','unsure'], 'once'],
    zakatBaitulmal: [t('Zakat or Baitulmal pathway', 'Laluan zakat atau Baitulmal'), 'money', ['fund','refer','unsure'], 'ongoing'],
    emergencyFinancialHelp: [t('Emergency financial help', 'Bantuan kewangan kecemasan'), 'money', ['fund','refer','unsure'], 'once']
  });
  area('food', 'Food and essential items', 'Makanan dan keperluan asas', {
    foodBasket: [t('Food basket', 'Bakul makanan'), 'consumable', ['donate','monthly','fund','unsure'], 'ongoing'],
    preparedMeals: [t('Prepared meals', 'Makanan siap dimasak'), 'service', ['service','donate','fund','unsure'], 'ongoing'],
    groceryHelp: [t('Groceries or shopping help', 'Barang dapur atau bantuan membeli'), 'service', ['service','donate','fund','unsure'], 'ongoing'],
    householdEssentials: [t('Household essentials', 'Keperluan rumah'), 'consumable', ['donate','monthly','buy','fund','unsure'], 'ongoing']
  });
  area('social', 'Companionship and cognitive support', 'Teman dan sokongan kognitif', {
    homeVisits: [t('Home visits', 'Lawatan ke rumah'), 'service', ['service','refer','unsure'], 'ongoing'],
    phoneCheckins: [t('Regular phone check-ins', 'Panggilan bertanya khabar'), 'service', ['service','refer','unsure'], 'ongoing'],
    religiousSupport: [t('Religious or spiritual support', 'Sokongan agama atau kerohanian'), 'service', ['service','refer','unsure'], 'ongoing'],
    memorySupport: [t('Memory or dementia support', 'Sokongan ingatan atau demensia'), 'service', ['service','refer','fund','unsure'], 'ongoing'],
    digitalHelp: [t('Help using a phone', 'Bantuan menggunakan telefon'), 'service', ['service','refer','unsure'], 'once']
  });
  area('housing', 'Housing and ageing in place', 'Perumahan dan penuaan di rumah', {
    homeSafetyCheck: [t('Home safety assessment', 'Penilaian keselamatan rumah'), 'home', ['service','refer','unsure'], 'once'],
    cleaningHelp: [t('Cleaning or minor repairs', 'Bantuan mengemas atau pembaikan kecil'), 'service', ['service','donate','fund','refer','unsure'], 'ongoing'],
    dayCare: [t('Day care centre', 'Pusat jagaan harian'), 'service', ['service','refer','fund','unsure'], 'ongoing'],
    residentialCare: [t('Residential care information', 'Maklumat rumah jagaan'), 'service', ['service','refer','fund','unsure'], 'ongoing']
  });

  var capability = [
    { prefix:'Masjid', items:['wheelchair','walker','walkingStick','hospitalBed','showerChair','adultDiapers','underpads','foodBasket','homeVisits','religiousSupport','hospitalEscort'], modes:['borrow','donate','service','refer','fund'], speed:'days', scope:'district', cost:'free' },
    { prefix:'Kedah Islamic Welfare', items:['monthlyLivingAid','medicalBills','foodBasket','adultDiapers','wheelchair'], modes:['donate','fund','service','refer'], speed:'weeks', scope:'state', cost:'free', eligibility:true },
    { prefix:'WANIDA', items:['homeVisits','foodBasket','householdEssentials','adultDiapers','phoneCheckins'], modes:['donate','service','refer'], speed:'weeks', scope:'state', cost:'free' },
    { prefix:'PERKIM', items:['homeVisits','religiousSupport','foodBasket','monthlyLivingAid'], modes:['donate','service','fund','refer'], speed:'weeks', scope:'state', cost:'free', eligibility:true },
    { prefix:'MAIK', items:['monthlyLivingAid','equipmentFunding','medicalBills','zakatBaitulmal','emergencyFinancialHelp','ramp','bathroomRails'], modes:['fund','refer'], speed:'weeks', scope:'state', cost:'free', eligibility:true },
    { prefix:'LZNK', items:['monthlyLivingAid','equipmentFunding','medicalBills','zakatBaitulmal','emergencyFinancialHelp'], modes:['fund','refer'], speed:'weeks', scope:'state', cost:'free', eligibility:true },
    { prefix:'JKM', items:['monthlyLivingAid','equipmentFunding','wheelchair','walker','respiteCare','dayCare','residentialCare','personalCarer'], modes:['fund','refer','donate','service'], speed:'weeks', scope:'state', cost:'free', eligibility:true },
    { prefix:'PAWE', items:['homeVisits','phoneCheckins','digitalHelp','religiousSupport','dayCare'], modes:['service','refer'], speed:'days', scope:'district', cost:'free' },
    { prefix:'Kedah Home Nursing', items:['homeNursing','postHospitalCare','medicationHelp','woundCare','catheterSupplies','personalCarer','oxygenCylinder','oxygenConcentrator','suctionMachine','nebuliser','pulseOximeter','healthMonitor'], modes:['service','rent','buy'], speed:'days', scope:'district', cost:'paid' },
    { prefix:'Amanah Elderly Care', items:['residentialCare','respiteCare','dayCare','personalCarer','hospitalBed','pressureMattress','patientHoist'], modes:['service','rent'], speed:'weeks', scope:'district', cost:'paid' },
    { prefix:'Kedah Community Transport', items:['appointmentTransport','dialysisTransport','wheelchairTransport','hospitalEscort'], modes:['service'], speed:'days', scope:'district', cost:'low' },
    { prefix:'Meals-on-Wheels', items:['preparedMeals','foodBasket','groceryHelp'], modes:['service','donate'], speed:'days', scope:'district', cost:'low' },
    { prefix:'Volunteer Pool', items:['homeVisits','phoneCheckins','hospitalEscort','groceryHelp','medicinePickup','cleaningHelp','digitalHelp'], modes:['service','donate'], speed:'days', scope:'district', cost:'free' }
  ];

  function lowIncome(s) { return ['0','800','1500'].indexOf(String(s.income)) >= 0; }
  function providerFor(rec) { for (var i=0; i<capability.length; i++) if (rec.name.indexOf(capability[i].prefix) === 0) return capability[i]; return null; }
  function matches(s, need, rec, index, cap) {
    var points = 40, reasons = ['offers'], cautions = [];
    if (need.mode === 'unsure' || cap.modes.indexOf(need.mode) >= 0) { points += 18; reasons.push(need.mode === 'unsure' ? 'modeUnknown' : 'mode'); } else cautions.push('modeDiffers');
    if (rec.district === s.district) { points += 20; reasons.push('sameDistrict'); } else if (cap.scope === 'state') { points += 12; reasons.push('statewide'); } else cautions.push('otherDistrict');
    if ((s.urgency === 'today' || s.urgency === 'days') && cap.speed === 'days') { points += 8; reasons.push('fast'); } else if (s.urgency === 'today' && cap.speed === 'weeks') cautions.push('slow');
    if (cap.eligibility) { if (lowIncome(s)) { points += 6; reasons.push('incomePathway'); } else cautions.push('eligibility'); }
    if (cap.cost === 'free') reasons.push('free'); else if (cap.cost === 'paid' && s.pay === 'none') { points -= 8; cautions.push('cost'); }
    if (rec.status === 'Verified') { points += 8; reasons.push('recordConfirmed'); } else if (rec.status === 'Candidate') points += 3;
    return { index:index, record:rec, points:Math.max(5, Math.min(99, points)), reasons:reasons, cautions:cautions, capability:cap };
  }
  A.normalize = function (input) {
    var s = input || {}, out = [];
    (Array.isArray(s.assistanceNeeds) ? s.assistanceNeeds : []).forEach(function (n) {
      if (!n || !A.items[n.item] || out.some(function (x) { return x.item === n.item; })) return;
      var it = A.items[n.item], mode = (it.modes || []).indexOf(n.mode) >= 0 ? n.mode : (it.modes || ['unsure'])[0];
      out.push({ item:n.item, mode:mode, duration:A.durations[n.duration] ? n.duration : it.duration });
    });
    out.sort(function (a, b) { return a.item.localeCompare(b.item); });
    return { assistanceNeeds:out, urgency:A.urgency[s.urgency] ? s.urgency : 'info', district:s.district || '', income:s.income || 'unknown', pay:s.pay || 'unsure' };
  };
  A.plan = function (input) {
    var s = A.normalize(input), lines = [];
    s.assistanceNeeds.forEach(function (need) {
      var item = A.items[need.item], found = [];
      K.records.forEach(function (rec, index) { var cap = providerFor(rec); if (cap && cap.items.indexOf(need.item) >= 0) found.push(matches(s, need, rec, index, cap)); });
      found.sort(function (a,b) { return b.points - a.points || a.index - b.index; });
      lines.push({ need:need, item:item, matches:found.slice(0,3), best:found[0] || null });
    });
    var covered = lines.filter(function (l) { return !!l.best; }).length;
    var areas = []; lines.forEach(function (l) { if (areas.indexOf(l.item.area) < 0) areas.push(l.item.area); });
    return { version:VERSION, input:s, lines:lines, total:lines.length, covered:covered, areas:areas, needsCoordinator:lines.length >= 3 || areas.length >= 3 };
  };
  A.catalog = function () { return A.areas; };
  K.assistance = A;
})(window.KSE);
