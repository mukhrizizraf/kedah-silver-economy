/* ==========================================================================
   Kedah Silver Economy: data layer
   Everything the pages show that is not layout: the organisation list, the
   case model, budget, reviewer comments and the Bahasa Melayu dictionary.
   Figures trace back to dokumen/ (application form + reply to reviewers).
   Loaded in <head> before kse-shell.js.
   Writing style: short sentences, everyday words, no em dashes.
   ========================================================================== */
window.KSE = window.KSE || {};

(function (K) {
'use strict';

/* ---------- Organisation list (sample, 30 records) ----------
   status keys stay as data values; labels are in K.status:
   Verified = Confirmed, Candidate = To check, Demo = Example            */
K.records = [
{name:'Masjid Sharifah Fatimah',type:'Mosque',district:'Kubang Pasu',cap:'Companion visits · food support · referral',status:'Candidate'},
{name:'Masjid Al-Bukhary Kedah',type:'Mosque',district:'Kota Setar',cap:'Community activities · transport coordination',status:'Candidate'},
{name:'Masjid Alor Merah',type:'Mosque',district:'Kota Setar',cap:'Food basket · volunteer mobilisation',status:'Candidate'},
{name:'Masjid Taman Ria',type:'Mosque',district:'Sungai Petani',cap:'Social support · befriending',status:'Candidate'},
{name:'Masjid Bandar Baharu',type:'Mosque',district:'Kulim',cap:'Community support · referral',status:'Candidate'},
{name:'Kedah Islamic Welfare Association',type:'NGO',district:'Kota Setar',cap:'Welfare navigation · home visits',status:'Candidate'},
{name:'WANIDA Kedah',type:'NGO',district:'Kota Setar',cap:'Volunteer mobilisation · welfare programmes',status:'Candidate'},
{name:'PERKIM Kedah',type:'NGO',district:'Kota Setar',cap:'Faith-based welfare · convert support',status:'Candidate'},
{name:'Kedah Senior Citizens Network',type:'NGO',district:'Sungai Petani',cap:'Befriending · community activities',status:'Demo'},
{name:'MAIK / Baitulmal',type:'Institution',district:'Kota Setar',cap:'Financial assistance · welfare assessment',status:'Candidate'},
{name:'LZNK',type:'Institution',district:'Kota Setar',cap:'Zakat eligibility · financial support',status:'Candidate'},
{name:'JKM Kedah',type:'Institution',district:'Kota Setar',cap:'Welfare assessment · care referrals',status:'Verified'},
{name:'PAWE Kubang Pasu',type:'Institution',district:'Kubang Pasu',cap:'Social activities · ageing in place',status:'Verified'},
{name:'PAWE Kota Setar',type:'Institution',district:'Kota Setar',cap:'Social activities · peer support',status:'Verified'},
{name:'PAWE Kulim',type:'Institution',district:'Kulim',cap:'Social activities · peer support',status:'Verified'},
{name:'PAWE Sungai Petani',type:'Institution',district:'Sungai Petani',cap:'Social activities · peer support',status:'Verified'},
{name:'Kedah Home Nursing 01',type:'Provider',district:'Kota Setar',cap:'Home nursing · wound care · daily living support',status:'Demo'},
{name:'Kedah Home Nursing 02',type:'Provider',district:'Sungai Petani',cap:'Home care · medication reminders',status:'Demo'},
{name:'Amanah Elderly Care Home 01',type:'Provider',district:'Kulim',cap:'Short stays · daily living support',status:'Demo'},
{name:'Amanah Elderly Care Home 02',type:'Provider',district:'Kota Setar',cap:'Residential care · caregiver support',status:'Demo'},
{name:'Kedah Community Transport 01',type:'Provider',district:'Kubang Pasu',cap:'Hospital transport · appointment escort',status:'Demo'},
{name:'Kedah Community Transport 02',type:'Provider',district:'Sungai Petani',cap:'Hospital transport · mobility support',status:'Demo'},
{name:'Meals-on-Wheels Kedah',type:'Provider',district:'Kota Setar',cap:'Meal delivery · food basket',status:'Demo'},
{name:'Neighbourhood Care Hub Kulim',type:'Provider',district:'Kulim',cap:'Help at home · shopping support',status:'Demo'},
{name:'Volunteer Pool Jitra',type:'Volunteer',district:'Kubang Pasu',cap:'Companion visits · hospital escort',status:'Demo'},
{name:'Volunteer Pool Alor Setar',type:'Volunteer',district:'Kota Setar',cap:'Phone check-ins · errands',status:'Demo'},
{name:'Volunteer Pool Sungai Petani',type:'Volunteer',district:'Sungai Petani',cap:'Transport · companionship',status:'Demo'},
{name:'Volunteer Pool Baling',type:'Volunteer',district:'Baling',cap:'Home visits · food delivery',status:'Demo'},
{name:'Volunteer Pool Langkawi',type:'Volunteer',district:'Langkawi',cap:'Community visits · referral',status:'Demo'},
{name:'Kedah Silver Economy Coordination Desk',type:'Institution',district:'Kota Setar',cap:'Intake · referral tracking · gap reports',status:'Demo'}
];

/* c = colour slot (tokens --t1..5 / --b1..5). Order is fixed. */
K.types = {
Institution:{c:1,one:{en:'Agency',bm:'Agensi'},many:{en:'Agencies',bm:'Agensi'}},
NGO:{c:2,one:{en:'NGO',bm:'NGO'},many:{en:'NGOs',bm:'NGO'}},
Mosque:{c:3,one:{en:'Masjid',bm:'Masjid'},many:{en:'Masjids',bm:'Masjid'}},
Provider:{c:4,one:{en:'Care provider',bm:'Penyedia penjagaan'},many:{en:'Care providers',bm:'Penyedia'}},
Volunteer:{c:5,one:{en:'Volunteer group',bm:'Kumpulan sukarelawan'},many:{en:'Volunteers',bm:'Sukarelawan'}}
};
K.typeOrder = ['Institution','NGO','Mosque','Provider','Volunteer'];

/* ring = distance from the centre on the overview map (closer = more certain) */
K.status = {
Verified:{en:'Confirmed',bm:'Disahkan',ring:78,key:{en:'we have checked that it exists.',bm:'kami sudah semak ia wujud.'}},
Candidate:{en:'To check',bm:'Perlu disemak',ring:128,key:{en:'likely to fit, but its services are not checked yet.',bm:'mungkin sesuai, tetapi perkhidmatannya belum disemak.'}},
Demo:{en:'Example',bm:'Contoh',ring:178,key:{en:'a made-up record to show how the system works.',bm:'rekod rekaan untuk menunjukkan cara sistem berfungsi.'}}
};
K.statusOrder = ['Verified','Candidate','Demo'];
K.counts = {};
K.statusOrder.forEach(function (s) { K.counts[s] = K.records.filter(function (r) { return r.status === s; }).length; });

/* ---------- The three lists shown on the "How it works" page ---------- */
K.schema = [
{t:{en:'Organisation',bm:'Organisasi'},key:{5:{en:'On every record',bm:'Pada setiap rekod'}},
 f:[['Name','Nama'],['Type','Jenis'],['District','Daerah'],['Area covered','Kawasan liputan'],['Contact','Hubungan'],['Checked or not','Status semakan'],['Still active','Masih aktif']]},
{t:{en:'Services',bm:'Perkhidmatan'},key:{1:{en:'Used to match',bm:'Guna untuk padanan'},3:{en:'Used to match',bm:'Guna untuk padanan'},5:{en:'Used to match',bm:'Guna untuk padanan'}},
 f:[['Type of help','Jenis bantuan'],['Who qualifies','Siapa layak'],['Cost','Kos'],['Free places','Tempat kosong'],['Opening times','Waktu operasi'],['Referral needed','Perlu rujukan'],['At home or in hospital','Di rumah atau hospital']]},
{t:{en:'Volunteer',bm:'Sukarelawan'},key:{6:{en:'Required',bm:'Wajib'}},
 f:[['Location','Lokasi'],['Skills','Kemahiran'],['Has transport','Ada kenderaan'],['Free times','Masa lapang'],['Distance','Jarak'],['Training','Latihan'],['Background check','Semakan latar belakang']]}
];

/* ---------- "Try a case" model (sample logic, not real estimates) ---------- */
K.scenario = {
steps:{
  escort:{en:'Company or hospital escort',bm:'Teman atau iringan ke hospital'},
  commTransport:{en:'Community transport',bm:'Pengangkutan komuniti'},
  paweSocial:{en:'PAWE activities',bm:'Aktiviti PAWE'},
  welfareAssess:{en:'Welfare check',bm:'Semakan kebajikan'},
  food:{en:'Food help',bm:'Bantuan makanan'},
  homeAssist:{en:'Help at home',bm:'Bantuan di rumah'},
  hospTransport:{en:'Transport to hospital',bm:'Pengangkutan ke hospital'},
  medAssess:{en:'Medical check',bm:'Pemeriksaan perubatan'},
  homeNursing:{en:'Nursing at home',bm:'Rawatan di rumah'},
  welfareSupport:{en:'Welfare help',bm:'Bantuan kebajikan'},
  residential:{en:'Place in a care home',bm:'Tempat di rumah jagaan'},
  welfareElig:{en:'Check if they qualify for aid',bm:'Semak kelayakan bantuan'},
  foodMeal:{en:'Food or meal delivery',bm:'Makanan atau penghantaran makanan'}
},
nodes:{
  pawe:{n:'PAWE Kedah',s:'Verified'},
  volPool:{n:{en:'Volunteer group',bm:'Kumpulan sukarelawan'},s:'Demo'},
  mosqueNode:{n:{en:'Masjid or community group',bm:'Masjid atau kumpulan komuniti'},s:'Candidate'},
  maik:{n:'MAIK / Baitulmal',s:'Candidate'},
  jkmPawe:{n:'JKM / PAWE',s:'Verified'},
  foodNet:{n:{en:'Food bank network',bm:'Rangkaian bank makanan'},s:'Demo'},
  jkmHealth:{n:{en:'JKM / health services',bm:'JKM / perkhidmatan kesihatan'},s:'Verified'},
  homeCare:{n:{en:'Home care provider',bm:'Penyedia penjagaan di rumah'},s:'Demo'},
  transport:{n:'Kedah Community Transport',s:'Demo'},
  nursing:{n:'Kedah Home Nursing',s:'Demo'},
  meals:{n:'Meals-on-Wheels Kedah',s:'Demo'}
},
profiles:{
  independent:{coverage:78,steps:3,path:['escort','commTransport','paweSocial'],nodes:['pawe','volPool','mosqueNode'],gap:'single'},
  vulnerable:{coverage:64,steps:4,path:['welfareAssess','food','homeAssist','hospTransport'],nodes:['maik','jkmPawe','foodNet'],gap:'eligibility'},
  highneed:{coverage:42,steps:5,path:['medAssess','homeNursing','welfareSupport','food','residential'],nodes:['jkmHealth','maik','homeCare'],gap:'coordinator'}
},
needs:{
  companion:{add:0,step:'escort',node:'volPool'},
  transport:{add:-4,step:'hospTransport',node:'transport'},
  homecare:{add:-11,step:'homeNursing',node:'nursing'},
  welfare:{add:3,step:'welfareElig',node:'maik'},
  food:{add:-2,step:'foodMeal',node:'meals'}
},
districtAdj:{'Jitra':2,'Kota Setar':4,'Sungai Petani':1,'Kulim':0,'Baling':-8,'Langkawi':-10},
gaps:{
  single:{en:'There is no single contact point across the agencies yet.',bm:'Belum ada satu tempat hubungan untuk semua agensi.'},
  eligibility:{en:'We must check who qualifies and who has space before a referral can go ahead.',bm:'Kita perlu semak siapa layak dan siapa ada kekosongan sebelum rujukan boleh dibuat.'},
  coordinator:{en:'People with high needs need one named person to organise their medical, welfare and community help.',bm:'Warga emas berkeperluan tinggi perlukan seorang penyelaras untuk bantuan perubatan, kebajikan dan komuniti.'},
  district:{en:'Our list has few organisations in this district. Phase 1 must check what help is really there.',bm:'Senarai kami ada sedikit organisasi di daerah ini. Fasa 1 perlu semak bantuan yang benar-benar ada.'},
  capacity:{en:'There may not be enough trained staff. We will check this in the interviews and the trial.',bm:'Mungkin tidak cukup kakitangan terlatih. Kami akan semak perkara ini dalam temu bual dan percubaan.'}
},
states:{good:{en:'Well covered',bm:'Dipenuhi dengan baik'},warn:{en:'Partly covered',bm:'Dipenuhi sebahagian'},crit:{en:'Poorly covered',bm:'Kurang dipenuhi'}},
presets:[
  {l:{en:'Manages alone · Kota Setar',bm:'Urus diri · Kota Setar'},persona:'independent',district:'Kota Setar',need:'companion',income:3500},
  {l:{en:'Needs some help · Baling',bm:'Perlu sedikit bantuan · Baling'},persona:'vulnerable',district:'Baling',need:'welfare',income:800},
  {l:{en:'Needs a lot of help · Langkawi',bm:'Perlu banyak bantuan · Langkawi'},persona:'highneed',district:'Langkawi',need:'homecare',income:1200}
]
};

/* ---------- Budget (from the application form, grouped) ----------
   NOTE: see OPEN_ITEMS.md. The revised form adds a 3% RMC fee (RM874)
   under Vot 29000 inside the RM30,000 total. Confirm these lines.      */
K.budget = [
{l:{en:'Salary & wages',bm:'Gaji & upah'},v:18000},
{l:{en:'Workshops, participant tokens & services',bm:'Bengkel, token peserta & perkhidmatan'},v:7419},
{l:{en:'Travel & transport',bm:'Perjalanan & pengangkutan'},v:4281},
{l:{en:'Other / admin',bm:'Lain-lain / pentadbiran'},v:300}
];

/* ---------- Reply to reviewers (28 Sep 2026) ----------
   s: Verified = done, Candidate = in progress, Demo = later             */
K.reviews = [
{area:{en:'Title',bm:'Tajuk'},s:'Demo',where:'-',
 asked:{en:'R1 suggested a new title: "Integrated Islamic Ecosystem for Muslim Elderly Care: A Proof-of-Concept Study in the State of Kedah". R2 asked for a clearer scope.',bm:'R1 cadangkan tajuk baharu: "Integrated Islamic Ecosystem for Muslim Elderly Care: A Proof-of-Concept Study in the State of Kedah". R2 minta skop yang lebih jelas.'},
 done:{en:'We kept the current title for now. We will decide on the new title with the agencies at the design workshop.',bm:'Kami kekalkan tajuk sekarang buat masa ini. Tajuk baharu akan diputuskan bersama agensi dalam bengkel reka bentuk.'}},
{area:{en:'Executive summary',bm:'Ringkasan eksekutif'},s:'Verified',where:{en:'Summary',bm:'Ringkasan'},
 asked:{en:'Give the number of experts, the sample sizes and the main outputs.',bm:'Nyatakan bilangan pakar, saiz sampel dan hasil utama.'},
 done:{en:'Added a panel of 8–10 experts and the main sample sizes, within the 150-word limit.',bm:'Ditambah panel 8–10 pakar dan saiz sampel utama, dalam had 150 patah perkataan.'}},
{area:{en:'Background',bm:'Latar belakang'},s:'Verified',where:'p. 10',
 asked:{en:'Also discuss problems inside Islamic funding bodies, such as MAIK and LZNK roles that overlap and waqf assets that are hard to use. Add Kedah data.',bm:'Bincangkan juga masalah dalam badan kewangan Islam, seperti peranan MAIK dan LZNK yang bertindih dan aset wakaf yang sukar digunakan. Tambah data Kedah.'},
 done:{en:'Literature review updated. No study on joined-up care in Kedah exists yet.',bm:'Sorotan literatur dikemas kini. Belum ada kajian penjagaan bersepadu di Kedah.'}},
{area:{en:'Objectives',bm:'Objektif'},s:'Verified',where:'p. 14',
 asked:{en:'Objective 4 mixes working with the agencies and running the trial.',bm:'Objektif 4 mencampurkan kerja bersama agensi dan percubaan.'},
 done:{en:'Explained: 5 objectives in 4 phases. Objectives 4 and 5 are both in Phase 4.',bm:'Dijelaskan: 5 objektif dalam 4 fasa. Objektif 4 dan 5 kedua-duanya dalam Fasa 4.'}},
{area:{en:'Method',bm:'Metodologi'},s:'Verified',where:'pp. 14–15',
 asked:{en:'Explain Phase 4 in detail: how many experts, how validity is measured, sampling, ethics and the trial plan.',bm:'Terangkan Fasa 4 dengan terperinci: berapa pakar, cara kesahan diukur, persampelan, etika dan pelan percubaan.'},
 done:{en:'10 experts score the model (I-CVI and S-CVI/Ave) and add comments. Then a small trial of the referral process. Sample sizes added. Ethics will be handled before data collection.',bm:'10 pakar menilai model (I-CVI dan S-CVI/Ave) dan menulis ulasan. Kemudian percubaan kecil proses rujukan. Saiz sampel ditambah. Etika akan diuruskan sebelum pengumpulan data.'}},
{area:{en:'Expected results',bm:'Hasil dijangka'},s:'Verified',where:'-',
 asked:{en:'Prepare a policy brief or a practical guide for the state religious councils.',bm:'Sediakan ringkasan dasar atau panduan praktikal untuk majlis agama negeri.'},
 done:{en:'The model will come with a guide, included in the research brief and report.',bm:'Model akan disertakan panduan, dalam ringkasan penyelidikan dan laporan.'}},
{area:{en:'Impact',bm:'Impak'},s:'Verified',where:'pp. 16, 19',
 asked:{en:'Show how the Kedah trial could grow into national policy under the 13th Malaysia Plan, with clear measures.',bm:'Tunjukkan bagaimana percubaan Kedah boleh berkembang menjadi dasar nasional di bawah RMK-13, dengan ukuran yang jelas.'},
 done:{en:'Added a growth plan and clear measures. The model adds to national social protection. It does not replace it.',bm:'Pelan pengembangan dan ukuran yang jelas ditambah. Model ini menambah perlindungan sosial nasional, bukan menggantikannya.'}},
{area:{en:'Team',bm:'Pasukan'},s:'Verified',where:'p. 4',
 asked:{en:'Name a substitute leader (Ketua Gantian), as Section 3.1(h) requires.',bm:'Namakan Ketua Gantian seperti yang dikehendaki Seksyen 3.1(h).'},
 done:{en:'Substitute leader named in Section C(viii).',bm:'Ketua Gantian dinamakan dalam Seksyen C(viii).'}},
{area:{en:'Budget',bm:'Bajet'},s:'Verified',where:{en:'Budget',bm:'Bajet'},
 asked:{en:'Add the required 3% RMC fee under Vot 29000, and fix language errors.',bm:'Tambah yuran wajib 3% RMC di bawah Vot 29000, dan betulkan kesalahan bahasa.'},
 done:{en:'Added RM874 (3% of RM29,126) under Vot 29000. The total stays at RM30,000. Language checked.',bm:'RM874 (3% daripada RM29,126) ditambah di bawah Vot 29000. Jumlah kekal RM30,000. Bahasa telah disemak.'}},
{area:{en:'Risks',bm:'Risiko'},s:'Verified',where:'p. 21',
 asked:{en:'Add a risk plan: what if people drop out, who owns the model after the grant, and when to expand beyond Kedah.',bm:'Tambah pelan risiko: bagaimana jika peserta tarik diri, siapa pemilik model selepas geran, dan bila untuk berkembang ke luar Kedah.'},
 done:{en:'Added a risk section covering drop-outs, agencies not joining, delays, low turnout and trial problems. Each has a backup plan, such as finding a replacement from the same group.',bm:'Seksyen risiko ditambah: peserta tarik diri, agensi tidak menyertai, kelewatan, kehadiran rendah dan masalah percubaan. Setiap satu ada pelan sandaran, seperti mencari pengganti daripada kumpulan yang sama.'}},
{area:{en:'Partners',bm:'Rakan kerjasama'},s:'Candidate',where:'-',
 asked:{en:'Get a support letter from MAIK.',bm:'Dapatkan surat sokongan daripada MAIK.'},
 done:{en:'Meeting with MAIK set for October. We will add the letter when it is ready. Three partners have already agreed.',bm:'Pertemuan dengan MAIK ditetapkan pada Oktober. Surat akan ditambah apabila siap. Tiga rakan kerjasama telah bersetuju.'}}
];
K.reviewStatus = {
Verified:{en:'Done',bm:'Selesai'},
Candidate:{en:'In progress',bm:'Sedang dibuat'},
Demo:{en:'Later, at the workshop',bm:'Kemudian, di bengkel'}
};

/* ---------- Bahasa Melayu dictionary ----------
   English lives in the HTML; each [data-i18n] key maps to its BM text here. */
K.bm = {
/* overview */
eyebrow:'Geran Penyelidikan Scale-Up UUM 2026',
title:'Penjagaan Islam bersepadu untuk warga emas di Kedah',
lede:'Warga emas sering perlukan bantuan daripada beberapa pihak serentak. Projek ini menghubungkan keperluan mereka dengan badan Islam, agensi kebajikan, perkhidmatan kesihatan dan sukarelawan di Kedah, dan menunjukkan di mana hubungan itu terputus.',
metaAsk:'Jumlah',metaDur:'Tempoh',metaDurV:'9 bulan',metaPeriod:'Tarikh',metaSite:'Lokasi',
ctaWalk:'Lihat cara ia berfungsi',ctaScenario:'Cuba satu kes',
consTitle:'Siapa boleh membantu seorang warga emas',
consCap:'Setiap titik ialah satu organisasi dalam senarai kami. Titik dekat tengah sudah disahkan. Titik yang lebih jauh masih perlu disemak atau hanya contoh. Klik titik untuk melihat butirannya.',
kpi1:'objektif kajian',kpi2:'fasa projek',kpi3:'warga emas ditemu bual',kpi4:'peserta bengkel reka bentuk',kpi5:'pakar menilai model',
partnersLabel:'Agensi dalam kajian',
caseEyebrow:'Kenapa projek ini',caseTitle:'Bantuan ada, tetapi tidak bersambung',
caseSub:'Sekarang setiap agensi bekerja sendiri. Projek ini menguji cara mudah untuk mereka bekerjasama.',
problemTag:'Masalah',problemQuote:'Seorang warga emas mungkin perlukan beberapa jenis bantuan serentak, tetapi setiap agensi hanya uruskan bahagian sendiri.',
problemBody:'Kedah sudah ada agensi dan program yang sesuai. Yang tiada ialah hubungan yang jelas antara mereka. Keperluan tercicir apabila rujukan, syarat atau kekurangan kakitangan menghalang.',
responseTag:'Pelan kami',responseTitle:'Lima langkah, daripada masalah kepada model yang diuji',
responseBody:'Kami petakan siapa buat apa, dengar suara warga emas, reka model bersama agensi, kemudian uji dengan pakar dan satu percubaan kecil.',
step1:'Petakan',step1s:'Siapa buat apa sekarang',step2:'Dengar',step2s:'Keperluan warga emas',step3:'Reka',step3s:'Model bersama',step4:'Uji',step4s:'Pakar dan percubaan kecil',step5:'Baiki',step5s:'Sedia untuk negeri lain',
pitchEyebrow:'Apa yang akan kami hasilkan',pitchTitle:'Lima hasil, satu bagi setiap objektif',
pitchSub:'Setiap hasil siap pada akhir fasanya.',
due3:'Menjelang bulan 3',due5:'Menjelang bulan 5',due7:'Menjelang bulan 7',due8:'Bulan 8',due9:'Bulan 9',
o1title:'Peta perkhidmatan semasa',o1body:'Siapa yang aktif, apa yang ditawarkan, bagaimana mereka berhubung dan di mana jurangnya.',
o2title:'Keperluan warga emas',o2body:'Tema utama daripada temu bual dengan 8–10 warga emas Muslim.',
o3title:'Model penjagaan bersepadu',o3body:'Model yang dibina bersama agensi, menghubungkan bantuan Islam, kesihatan dan komuniti.',
o4title:'Laporan penilaian pakar',o4body:'Skor dan ulasan pakar tentang sama ada model ini relevan, boleh dilaksana dan sedia digunakan.',
o5title:'Model akhir dan pelan',o5body:'Model yang diperbaiki dan pelan untuk menggunakannya di luar Kedah.',
impactTag:'Matlamat kami',impactBody:'Penjagaan warga emas yang lebih tersusun, sesuai dengan agama dan budaya, dan berterusan.',
walkEyebrow:'Seterusnya',walkTitle:'Lima halaman lagi',
walkSub:'Setiap halaman menjawab satu soalan. Guna kekunci anak panah untuk beralih halaman.',

/* how it works */
ecoTitle:'Bagaimana warga emas dipadankan dengan bantuan',
ecoSub:'Ada tiga bahagian: apa keperluan warga emas, siapa boleh membantu, dan satu langkah yang memadankan keduanya. Ia menunjukkan bantuan yang ada dan yang masih tiada.',
ecoStat:'jenis data yang kami kumpul',
flowEyebrow:'Cara ia berfungsi',flowTitle:'Keperluan, padanan, bantuan',
demand:'Warga emas',profile:'Maklumat diri',profileSub:'Umur, daerah, pendapatan, isi rumah, kesihatan, kehendak',
needs:'Apa yang diperlukan',needsSub:'Pengangkutan, teman, makanan, penjagaan di rumah, kebajikan, kesihatan',
context:'Had',contextSub:'Kelayakan, jarak, tempat kosong, rujukan dan kos',
engineCircle:'PADAN',engineTitle:'Langkah padanan',engineBody:'Mencari siapa boleh membantu, ikut syarat, lokasi, tempat kosong dan tahap kecemasan.',
chipNeed:'Keperluan sesuai',chipDistrict:'Daerah sama',chipCapacity:'Ada kekosongan',chipReferral:'Rujukan',
supply:'Siapa boleh membantu',institutions:'Agensi',providers:'Penyedia penjagaan',providersSub:'Kesihatan · penjagaan di rumah · NGO · komuniti',
volunteers:'Sukarelawan',volunteersSub:'Teman, pengangkutan, lawatan dan bantuan harian',
pathway:'Hasil',pathwaySub:'Bantuan yang sesuai, ke mana dirujuk, dan keperluan yang belum dipenuhi',
dataEyebrow:'Data',dataTitle:'Tiga senarai di sebalik padanan',
dataSub:'Senarai ini menyimpan semua yang diperlukan untuk padanan. Dalam Fasa 1 kami isikan dengan data yang telah disemak.',
dataNote:'Dashboard ini guna rekod contoh untuk menunjukkan cara ia berfungsi. Rekod yang perlu disemak dan rekod contoh ditanda dengan jelas.',

/* who can help */
netTitle:'30 organisasi yang boleh membantu',
netSub:'Ini senarai contoh untuk menunjukkan cara padanan berfungsi. Setiap satu ditanda disahkan, perlu disemak atau contoh, supaya tidak disangka senarai lengkap Kedah yang telah disemak.',
netStat:'disahkan setakat ini',
fType:'Jenis',fDistrict:'Daerah',fStatus:'Status',
optAllTypes:'Semua jenis',optInst:'Agensi',optNGO:'NGO',optMosque:'Masjid',optProvider:'Penyedia penjagaan',optVolunteer:'Kumpulan sukarelawan',
optAllDistricts:'Semua daerah',optAllStatus:'Semua status',optVerified:'Disahkan',optCandidate:'Perlu disemak',optDemo:'Contoh',
thOrg:'Organisasi',thType:'Jenis',thDistrict:'Daerah',thCap:'Apa yang mereka buat',thStatus:'Status',
pitchTipLabel:'Semasa membentang:',pitchTip:'mulakan dengan yang ditanda "perlu disemak". Terangkan bahawa Fasa 1 menyemak perkhidmatan, kelayakan, tempat kosong, hubungan dan cara rujukan setiap satu.',
chartTag:'Ikut daerah',chartTitle:'Organisasi di setiap daerah',chartNote:'Bar mengikut penapis di atas. Halakan tetikus pada bar untuk melihat bilangan.',
chainTag:'Apa yang akan diuji',chainTitle:'Bagaimana rujukan sepatutnya berjalan',
chain1:'Warga emas',chain1s:'Keperluan, daerah dan kelayakan mereka',chain2:'Seorang penyelaras',chain2s:'Satu tempat hubungan untuk bantuan kebajikan, kesihatan dan komuniti',
chain3:'Pasukan bantuan',chain3s:'Penyedia penjagaan, sukarelawan dan bantuan kewangan',chainLink:'Belum diuji',
chainNote:'Kami mahu tahu siapa yang ada, dan juga bagaimana seseorang bergerak dari satu pihak ke pihak lain.',

/* try a case */
labTitle:'Pilih warga emas dan keperluannya. Lihat bantuan yang ada.',labSub:'Tukar pilihan di bawah. Langkah, skor dan masalah utama berubah serta-merta.',
labStat:'kes yang boleh dicuba',
presetLabel:'Cuba',
personaLabel:'Warga emas',districtLabel:'Daerah',needLabel:'Keperluan utama',incomeLabel:'Pendapatan isi rumah sebulan',
pIndependent:'Boleh urus diri sendiri',pVulnerable:'Perlukan sedikit bantuan',pHighneed:'Perlukan banyak bantuan',
nCompanion:'Teman atau iringan ke hospital',nTransport:'Pengangkutan',nHomecare:'Penjagaan di rumah',nWelfare:'Bantuan wang atau kebajikan',nFood:'Makanan',
coverageLabel:'Sejauh mana keperluan dipenuhi',demoTag:'Data contoh sahaja',matchedNeeds:'Keperluan yang ada bantuan',steps:'Bilangan rujukan',
methodNote:'Skor bermula daripada jenis warga emas, kemudian berubah ikut keperluan, daerah dan pendapatan. Ia menunjukkan cara logik berfungsi, bukan anggaran sebenar.',
pathLabel:'Langkah dicadangkan',providersLabel:'Siapa boleh membantu',gapLabel:'Masalah utama untuk disemak',

/* plan & budget */
roadTitle:'Pelan 9 bulan',
roadLede:'Empat fasa dan satu hasil bagi setiap objektif, dengan RM30,000.',
roadStat:'selama 9 bulan',
ganttEyebrow:'Garis masa',ganttTitle:'Apa berlaku setiap bulan',
mon1:'Nov',mon2:'Dis',mon5:'Mac',mon7:'Mei',
objN1:'Objektif 1',objN2:'Objektif 2',objN3:'Objektif 3',objN4:'Objektif 4',objN5:'Objektif 5',
ph1:'Fasa 1',ph2:'Fasa 2',ph3:'Fasa 3',ph4:'Fasa 4',
obj1:'Petakan perkhidmatan semasa',obj2:'Kenal pasti keperluan warga emas',obj3:'Reka model bersama agensi',obj4:'Uji model',obj5:'Baiki dan siapkan',
act1:'Baca dasar dan laporan, dan temu bual badan Islam, agensi kebajikan dan NGO',
act2:'Temu bual 8–10 warga emas Muslim dan kenal pasti tema utama',
act3:'Bengkel bersama 15–20 wakil agensi untuk setuju peranan, pembiayaan dan cara bekerjasama',
act4:'Pakar menilai model, kemudian kami jalankan percubaan kecil proses rujukan',
act5:'Kemas kini model berdasarkan skor pakar dan hasil percubaan',
out1:'Peta perkhidmatan semasa',out2:'Keperluan dan masalah utama',out3:'Draf model',out4:'Model disemak dan maklum balas percubaan',out5:'Model akhir dan laporan',
lgActive:'Bulan bekerja',lgOutput:'Hasil siap',
roadSub:'Berdasarkan borang permohonan dan imej peta jalan. Objektif 4 dan 5 kedua-duanya dalam Fasa 4.',
valTag:'Penilaian pakar · Fasa 4',valTitle:'Bagaimana pakar menilai model',
valBody:'Panel pakar memberi skor untuk setiap bahagian model dan menulis ulasan.',
crit1:'Relevan',crit2:'Jelas',crit3:'Boleh dilaksana',crit4:'Lengkap',crit5:'Sesuai',
m1:'skor setiap item',m2:'purata untuk seluruh model',
pilotTag:'Percubaan kecil',pilotTitle:'Apa yang disemak dalam percubaan',
pilotBody:'Selepas penilaian pakar, kami cuba sebahagian model secara kecil. Fokusnya ialah cara agensi merujuk warga emas antara satu sama lain.',
pc1:'Adakah ia berfungsi',pc2:'Adakah ia diterima',pc3:'Adakah peranan jelas',pc4:'Apa yang menghalang',pc5:'Apa perlu diperbaiki',
budgetEyebrow:'Bajet',budgetTitle:'Bagaimana RM30,000 dibelanjakan',
budgetSub:'Sebahagian besar untuk membayar pasukan projek selama sembilan bulan. Bakinya untuk bengkel, perjalanan dan perkhidmatan penyelidikan.',
totalLabel:'Jumlah',totalSub:'Untuk 9 bulan, 1 Nov 2026 hingga 31 Jul 2027',
budgetNote:'Angka daripada borang permohonan, digabung kepada empat baris supaya mudah dibaca.',

/* sources */
evTitle:'Dari mana fakta ini datang',
evLede:'Setiap angka di sini datang daripada permohonan yang disemak dan jawapan kami kepada penilai. Halaman ini menyenaraikan dokumen tersebut dan apa yang kami ubah selepas setiap ulasan.',
evStat:'ulasan penilai selesai',
srcEyebrow:'Dokumen',srcTitle:'Empat dokumen di sebalik dashboard ini',
srcSub:'Borang permohonan dan jawapan kepada penilai ialah sumber utama.',
kindForm:'Permohonan',kindReview:'Penilaian',kindConcept:'Idea',kindRoadmap:'Pelan',
src1d:'Disemak 28 September 2026 · 23 halaman',src2:'Jawapan kepada penilai',src2d:'28 September 2026 · 5 halaman',
src3:'Perbincangan idea awal',src3d:'Cara platform dan padanan sepatutnya berfungsi',
src4:'Imej peta jalan',src4d:'Daripada percubaan Kedah kepada dasar yang lebih luas',
revEyebrow:'Ulasan penilai',revTitle:'Apa penilai minta dan apa kami ubah',
revSub:'Daripada jadual jawapan bertarikh 28 September 2026. Nombor halaman merujuk kepada permohonan yang disemak.',
thNo:'Bil.',thArea:'Topik',thAsked:'Apa yang diminta',thDone:'Apa kami buat',thWhere:'Halaman',thState:'Status',
verdictTag:'Keputusan keseluruhan',
verdictQuote:'"Cadangan ini disyorkan dengan sedikit penambahbaikan pada metodologi, hasil projek, pelan pelaksanaan dan butiran bajet."',
verdictCite:'Penilai 2, ulasan keseluruhan (terjemahan)'
};

})(window.KSE);
