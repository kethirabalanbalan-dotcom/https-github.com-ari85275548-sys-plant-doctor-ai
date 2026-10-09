export interface PlantGuideItem {
  id: string;
  name: string;
  tamilName: string;
  tanglishName: string;
  scientificName: string;
  category: 'Vegetable' | 'Cereal' | 'Fruit' | 'Cash Crop' | 'Flower' | 'Spice';
  imageUrl: string;
  growthDuration: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  summary: {
    en: string;
    ta: string;
    tanglish: string;
  };
  // The 13 Requested Agronomic Care Pillars
  watering: {
    en: string;
    ta: string;
    tanglish: string;
    frequency: string;
    method: string;
  };
  temperature: {
    en: string;
    ta: string;
    tanglish: string;
    idealRange: string;
  };
  sunlight: {
    en: string;
    ta: string;
    tanglish: string;
    hours: string;
  };
  soilCare: {
    en: string;
    ta: string;
    tanglish: string;
    ph: string;
    soilType: string;
  };
  soilTilling: {
    en: string;
    ta: string;
    tanglish: string;
    prepStep: string;
  };
  fertilizing: {
    en: string;
    ta: string;
    tanglish: string;
    npk: string;
    organic: string;
  };
  repotting: {
    en: string;
    ta: string;
    tanglish: string;
    spacing: string;
    seedlingAge: string;
  };
  pestControl: {
    en: string;
    ta: string;
    tanglish: string;
    majorPests: string[];
    remedy: string;
  };
  disease: {
    en: string;
    ta: string;
    tanglish: string;
    majorDiseases: string[];
    remedy: string;
  };
  humidity: {
    en: string;
    ta: string;
    tanglish: string;
    idealRange: string;
  };
  sowing: {
    en: string;
    ta: string;
    tanglish: string;
    season: string;
    seedRate: string;
  };
  pruning: {
    en: string;
    ta: string;
    tanglish: string;
    whenToPrune: string;
  };
  harvesting: {
    en: string;
    ta: string;
    tanglish: string;
    maturitySigns: string;
    expectedYield: string;
  };
}

export const PLANT_GUIDES: PlantGuideItem[] = [
  {
    id: 'rice_paddy',
    name: 'Rice / Paddy',
    tamilName: 'நெல்',
    tanglishName: 'Nel / Paddy',
    scientificName: 'Oryza sativa',
    category: 'Cereal',
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=800&auto=format&fit=crop&q=80',
    growthDuration: '110 - 135 Days',
    difficulty: 'Moderate',
    summary: {
      en: 'Major staple grain requiring shallow standing water or alternate wetting & drying (AWD), warm climate, and fertile alluvial/clayey soil.',
      ta: 'தமிழ்நாட்டின் முதன்மை உணவுப் பயிர். சீரான பாசனம், ஊட்டச்சத்து மேலாண்மை மற்றும் களைக் கட்டுப்பாடு மூலம் அதிக மகசூல் பெறலாம்.',
      tanglish: 'Tamilnattoda primary crop. Sariyana water management and bio-fertilizer podum pothu nalla harvest kidaikkum.'
    },
    watering: {
      en: 'Maintain 2 to 5 cm standing water layer from tillering to grain filling. Drain water 10-14 days before harvest.',
      ta: 'பயிர் நடவு முதல் தூர் கட்டும் பருவம் வரை 2-3 செ.மீ தண்ணீரும், பூக்கும் பருவத்தில் 5 செ.மீ தண்ணீரும் பராமரிக்கவும். அறுவடைக்கு 10 நாட்களுக்கு முன் நீரை வடிக்கவும்.',
      tanglish: 'Plant nadavathu mudhal thoor katra varaikkum 2-3 cm thanni thenga vaikkanum. Harvest-ku 10 days mun water drain pannanum.',
      frequency: 'Alternate Wetting & Drying (AWD) or continuous shallow flood',
      method: 'Basin / Furrow Flooding'
    },
    temperature: {
      en: 'Optimal range: 22°C to 34°C. Temperatures below 18°C during flowering cause grain sterility.',
      ta: 'உகந்த வெப்பநிலை: 22°C முதல் 34°C வரை. பூக்கும் போது அதிக குளிரோ அல்லது 38°C மேல் வெயிலோ இருக்கக்கூடாது.',
      tanglish: 'Ideal temperature 22°C to 34°C. Poo pookkum pothu excessive heat or cold irunthaal soraamani aagidum.',
      idealRange: '22°C - 34°C'
    },
    sunlight: {
      en: 'Requires full bright direct sun (7 to 9 hours daily). Ample solar radiation during grain filling maximizes yield.',
      ta: 'தினமும் 7 முதல் 9 மணி நேரம் நேரடி சூரிய ஒளி தேவை. கதிர் முதிர்ச்சி அடையும் போது நல்ல வெயில் இருக்க வேண்டும்.',
      tanglish: 'Daily 7-9 hours full sunshine thevai. Kadhir vara samayathula nalla veyil kidaikkanum.',
      hours: '7 - 9 Hours Daily'
    },
    soilCare: {
      en: 'Heavy clay or clay-loam soils with high water-retention capacity. Optimum pH between 5.5 and 6.8.',
      ta: 'களிமண் அல்லது செம்பொறை மண் சிறந்தது. மண்ணில் நீர் தேங்கும் திறன் அதிகமாகவும், கார அமிலத்தன்மை (pH) 5.5 முதல் 6.8 வரை இருக்க வேண்டும்.',
      tanglish: 'Clay loam or kariyan mann romba nallathu. Water thengum capacity athigamaga irukka vendum. pH 5.5 - 6.8 best.',
      ph: '5.5 - 6.8',
      soilType: 'Clay / Clay Loam'
    },
    soilTilling: {
      en: 'Plough field dry twice with disc plough, then puddle with rotavator 3 times in standing water to create an impervious subsoil layer.',
      ta: 'நிலத்தை முதலில் கோடை உழவு செய்யவும். பின் 3 முறை தண்ணீர் பாய்ச்சி சேற்றுழவு (Puddling) செய்து சமன்படுத்த வேண்டும்.',
      tanglish: 'First dry ploughing 2 times pannanum. Apram water paachi 3 murai Puddling (setru-zhavu) panni level pannanum.',
      prepStep: 'Puddle in standing water and level thoroughly'
    },
    fertilizing: {
      en: 'NPK 120:40:40 kg/ha. Apply Nitrogen in 3 splits (basal, active tillering, panicle initiation). Apply Zinc sulphate @ 25 kg/ha.',
      ta: 'ஹெக்டேருக்கு தழைச்சத்து 120 கிலோ, மணிச்சத்து 40 கிலோ, சாம்பல் சத்து 40 கிலோ. தழைச்சத்தை 3 முறையாகப் பிரித்து இடவும். ஜிங்க் சல்பேட் 25 கிலோ இடவும்.',
      tanglish: 'NPK 120:40:40 kg/ha. Urea-va 3 split-ah podanum. Zinc sulphate 25kg basal-la serkanum.',
      npk: '120:40:40 kg/ha',
      organic: '10 tonnes Farmyard Manure (FYM) + Azospirillum @ 2 kg/ha'
    },
    repotting: {
      en: 'Transplant 18 to 22 day-old healthy seedlings at 2-3 seedlings per hill with 20 x 10 cm or 25 x 25 cm (SRI method) spacing.',
      ta: '18-22 நாள் வயதுடைய இளம் நாற்றுகளை குத்துக்கு 2-3 நாற்றுகள் வீதம் 20x10 செ.மீ இடைவெளியில் நடவு செய்யவும்.',
      tanglish: '18-22 days nursery seedlings-ah 2-3 seedlings per hill vechi 20x10 cm space-la plant pannanum.',
      spacing: '20 x 10 cm (Normal) / 25 x 25 cm (SRI)',
      seedlingAge: '18 - 22 Days'
    },
    pestControl: {
      en: 'Major pests: Stem Borer, Brown Planthopper (BPH), Leaf Folder. Spray Chlorantraniliprole 18.5% SC @ 0.3ml/L or 5% Neem oil.',
      ta: 'தண்டுத்துளைப்பான், புகையான், இலைச்சுருட்டுப் புழு. கட்டுப்படுத்த குளோரான்ட்ரானிலிப்ரோல் 0.3 மி.லி/லிட்டர் அல்லது 5% வேப்பெண்ணெய் தெளிக்கவும்.',
      tanglish: 'Thanduthulaipaan, BPH puzhu thollai. Control panna Neem oil 5% or Chlorantraniliprole spray pannunga.',
      majorPests: ['Stem Borer (தண்டுத்துளைப்பான்)', 'BPH (புகையான்)', 'Leaf Folder (இலைச்சுருட்டுப் புழு)'],
      remedy: 'Neem seed kernel extract 5% or Cartap Hydrochloride 50% SP'
    },
    disease: {
      en: 'Leaf Blast, Sheath Blight, Bacterial Leaf Blight (BLB). Spray Tricyclazole 75% WP @ 1.2g/L or Pseudomonas fluorescens @ 10g/L.',
      ta: 'குலை நோய் (Blast), உறை கருகல், பாக்டீரியா இலைக்கருகல். டிரைசைக்ளசோல் 1.2 கிராம்/லிட்டர் அல்லது சூடோமோனாஸ் 10 கிராம்/லிட்டர் தெளிக்கவும்.',
      tanglish: 'Kulai Noi (Blast), Sheath Blight. Tricyclazole 1.2g per litre water-la spray panna nalla control aagum.',
      majorDiseases: ['Leaf Blast (குலை நோய்)', 'Sheath Blight (உறை அழுகல்)', 'Bacterial Leaf Blight'],
      remedy: 'Tricyclazole 75% WP @ 1.2g/L or Pseudomonas @ 10g/L'
    },
    humidity: {
      en: 'Prefers 70% - 85% relative humidity. Above 90% combined with overcast skies encourages blast and sheath rot.',
      ta: '70% - 85% ஈரப்பதம் உகந்தது. 90% க்கு மேல் தொடர்ந்து ஈரப்பதம் இருந்தால் பூஞ்சாண நோய்கள் தாக்கும்.',
      tanglish: '70% - 85% humidity best. Rombha drizzle or damp weather irunthaal blast spread aagum.',
      idealRange: '70% - 85%'
    },
    sowing: {
      en: 'Seed rate: 30-35 kg/acre (normal) or 2-3 kg/acre (SRI). Treat seeds with Carbendazim (2g/kg) or Trichoderma viride (10g/kg).',
      ta: 'விதை அளவு: ஏக்கருக்கு 30-35 கிலோ (சாதாரண முறை), 2-3 கிலோ (செம்மை நெல்). விதைகளை டிரைகோடெர்மா விரிடி (10 கிராம்/கிலோ) கொண்டு விதைநேர்த்தி செய்யவும்.',
      tanglish: 'Seed rate 30-35 kg per acre. Seed treatment panni nursery raise pannunga.',
      season: 'Kuruvai (Jun-Jul), Samba (Aug-Sep), Navarai (Dec-Jan)',
      seedRate: '30 - 35 kg/acre'
    },
    pruning: {
      en: 'De-weeding and rogueing off-types at 20 and 40 days after transplanting (DAT). Clip diseased leaf tips during nursery stage.',
      ta: 'நடவு செய்த 20 மற்றும் 40 ஆம் நாட்களில் களை எடுக்கவும். நாற்றங்காலில் நுனி இலைகளை வெட்டிவிட்டு நடவு செய்யவும்.',
      tanglish: 'Nadavu panna 20 and 40 days-la kalai edukka vendum. Seedling tip cut panni nadavathu stem borer eggs-ah azhikkum.',
      whenToPrune: 'Weeding at 20 & 40 DAT; tip clip seedlings before planting'
    },
    harvesting: {
      en: 'Harvest when 85-90% of panicles turn golden yellow and grain moisture drops to 20-22%. Dry grains to 14% moisture before storage.',
      ta: 'கதிரில் 85-90% நெல்மணிகள் தங்க மஞ்சள் நிறமாக மாறும் போது அறுவடை செய்யவும். தானியங்களை 14% ஈரப்பதத்திற்கு காயவைத்து சேமிக்கவும்.',
      tanglish: 'Panicle 85-90% golden yellow aana udane harvest pannunga. Nalla kaaya vechi store pannanum.',
      maturitySigns: '85-90% panicles turn golden yellow, grains hard',
      expectedYield: '2.5 - 3.2 tonnes / acre'
    }
  },
  {
    id: 'tomato_crop',
    name: 'Tomato',
    tamilName: 'தக்காளி',
    tanglishName: 'Thakkali (Tomato)',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=800&auto=format&fit=crop&q=80',
    growthDuration: '90 - 120 Days',
    difficulty: 'Easy',
    summary: {
      en: 'Versatile warm-season fruit vegetable that loves deep fertile soil, consistent watering, staking, and protection from fungal blights.',
      ta: 'குறைந்த காலத்தில் நல்ல வருமானம் தரும் காய்கறிப் பயிர். நல்ல சூரிய வெளிச்சம் மற்றும் சீரான நீர்ப்பாசனம் தேவை.',
      tanglish: 'Quick return thara koodiya vegetable. Nalla sunshine and regular drip irrigation thevai.'
    },
    watering: {
      en: 'Water 2-3 times a week (deep soaking at base). Avoid wetting leaves to prevent blights. Drip irrigation is highly recommended.',
      ta: 'வாரத்திற்கு 2-3 முறை செடியின் வேர்ப்பகுதியில் மட்டுமே தண்ணீர் பாய்ச்சவும். இலைகளில் தண்ணீர் படக்கூடாது. சொட்டுநீர் பாசனம் மிகச் சிறந்தது.',
      tanglish: 'Week-ku 2-3 times root-ku thanni oothunga. Leaves mela thelikka koodathu. Drip system best.',
      frequency: 'Every 2-3 days (Daily in peak summer)',
      method: 'Drip irrigation or base furrow'
    },
    temperature: {
      en: 'Optimum: 21°C to 28°C. Temperatures above 35°C lead to flower drop and poor fruit setting.',
      ta: 'உகந்த வெப்பநிலை: 21°C முதல் 28°C வரை. 35°C மேல் அதிகமான வெப்பம் இருந்தால் பூக்கள் உதிர்ந்து காய் பிடிக்காது.',
      tanglish: 'Optimum temperature 21°C - 28°C. 35°C-ku mela heat irunthaal poo kotti poidum.',
      idealRange: '21°C - 28°C'
    },
    sunlight: {
      en: 'Requires full bright direct sun (6 to 8 hours daily). Shade causes weak vine elongation and reduced fruit set.',
      ta: 'தினமும் 6 முதல் 8 மணி நேரம் முழுமையான நேரடி சூரிய ஒளி அவசியம்.',
      tanglish: 'Daily 6-8 hours direct sunlight thevai. Nizhal irunthaal plant thiramaiyya kaai vaikkaathu.',
      hours: '6 - 8 Hours Daily'
    },
    soilCare: {
      en: 'Well-drained sandy loam or rich loamy soil rich in organic matter. Soil pH 6.0 to 7.0.',
      ta: 'வடிகால் வசதியுள்ள செம்மண் அல்லது மணல் கலந்த வண்டல் மண் சிறந்தது. pH அளவு 6.0 முதல் 7.0 வரை இருக்க வேண்டும்.',
      tanglish: 'Well-drained red loam or alluvial soil best. pH 6.0 - 7.0 maintain pannanum.',
      ph: '6.0 - 7.0',
      soilType: 'Sandy Loam / Red Soil'
    },
    soilTilling: {
      en: 'Plough field to 25-30 cm depth, incorporate 10 tonnes FYM/acre, form ridges and furrows spaced 60 cm apart.',
      ta: 'நிலத்தை 25-30 செ.மீ ஆழத்திற்கு உழுது, ஏக்கருக்கு 10 டன் மட்கிய தொழுஉரம் இட்டு 60 செ.மீ இடைவெளியில் பார் அமைக்கவும்.',
      tanglish: 'Deep ploughing panni 10 tons manure kotti 60cm space-la ridges & furrows form pannanum.',
      prepStep: 'Deep plough, mix manure, form 60cm raised beds'
    },
    fertilizing: {
      en: 'NPK 75:40:40 kg/acre. Give basal DAP, apply Potash and Urea in 3 splits at 20, 45, and 65 days after planting.',
      ta: 'ஏக்கருக்கு NPK 75:40:40 கிலோ. நடவு சமயத்தில் பாஸ்பரஸ் இடவும். பொட்டாஷ் மற்றும் யூரியாவை 20, 45 மற்றும் 65 நாட்களில் பிரித்து இடவும்.',
      tanglish: 'NPK 75:40:40 kg/acre. Potash and nitrogen split panni podunga. Calcium spray panna blossom end rot varathu.',
      npk: 'NPK 75:40:40 kg/acre',
      organic: 'Vermicompost 2 tons/acre + Panchagavya 3% foliar spray'
    },
    repotting: {
      en: 'Transplant 25-day-old seedlings with sturdy stems during evening hours. Space plants 60 x 45 cm or 75 x 60 cm for hybrids.',
      ta: '25 நாள் வயதுடைய நாற்றுகளை மாலை வேளையில் 60x45 செ.மீ இடைவெளியில் நடவு செய்யவும்.',
      tanglish: '25 days nursery seedlings-ah evening time-la 60x45 cm space-la plant pannunga.',
      spacing: '60 x 45 cm (Hybrids: 75 x 60 cm)',
      seedlingAge: '25 - 30 Days'
    },
    pestControl: {
      en: 'Fruit Borer (Helicoverpa), Whiteflies, Leaf Miners. Spray Neem oil 10,000 ppm @ 3ml/L or Emamectin Benzoate 5% SG @ 0.5g/L.',
      ta: 'காய்ப்புழு, வெள்ளை ஈ, இலைத்துளைப்பான். வேப்பெண்ணெய் 3 மி.லி/லிட்டர் அல்லது எமாமெக்டின் பென்சோயேட் 0.5 கிராம்/லிட்டர் தெளிக்கவும்.',
      tanglish: 'Kaai puzhu, whitefly. Neem oil 3ml per litre or Emamectin benzoate 0.5g spray pannunga.',
      majorPests: ['Fruit Borer (காய்ப்புழு)', 'Whitefly (வெள்ளை ஈ)', 'Leaf Miner (இலைத்துளைப்பான்)'],
      remedy: 'Neem oil 3ml/L + Yellow sticky traps (15 traps/acre)'
    },
    disease: {
      en: 'Early Blight, Late Blight, Tomato Leaf Curl Virus. Spray Mancozeb 75% WP @ 2g/L or Copper Hydroxide @ 2.5g/L.',
      ta: 'ஆரம்ப இலைக்கருகல், பிற்பருவக்கருகல், இலைச்சுருட்டல் நோய். மேன்கோசெப் 2 கிராம் அல்லது காப்பர் ஹைட்ராக்சைடு 2.5 கிராம்/லிட்டர் தெளிக்கவும்.',
      tanglish: 'Early Blight, Leaf Curl. Mancozeb 2g per litre spray pannunga. Whiteflies control panna virus kuraiyum.',
      majorDiseases: ['Early Blight (இலைக்கருகல்)', 'Late Blight', 'Leaf Curl Virus (இலைச்சுருட்டல்)'],
      remedy: 'Mancozeb 2g/L or Copper Oxychloride 2.5g/L'
    },
    humidity: {
      en: 'Optimal humidity: 55% - 70%. Higher humidity combined with low airflow triggers severe fungal blight epidemics.',
      ta: '55% - 70% ஈரப்பதம் சிறந்தது. அதிக ஈரப்பதம் இருந்தால் பூஞ்சாண நோய்கள் எளிதில் பரவும்.',
      tanglish: '55% - 70% humidity. Adhigam dampness irunthaal blight noi adikkadi varum.',
      idealRange: '55% - 70%'
    },
    sowing: {
      en: 'Seed rate: 150-200g/acre for open pollinated, 50-70g/acre for hybrids. Sow in protrays filled with coco peat and vermicompost.',
      ta: 'விதை அளவு: ஏக்கருக்கு 150-200 கிராம் (வீரிய ரகங்கள் 60-70 கிராம்). குழித்தட்டு நாற்றாங்காலில் விதைக்கவும்.',
      tanglish: 'Seed rate 60-70g hybrid seeds. Pro-tray-la coco peat mix panni raise pannunga.',
      season: 'Jun - Jul (Kharif), Oct - Nov (Rabi), Jan - Feb (Summer)',
      seedRate: '60 - 70 g/acre (Hybrids)'
    },
    pruning: {
      en: 'Prune bottom 12 inches of foliage to avoid soil contact. Remove side suckers in indeterminate varieties to train on single/double stem.',
      ta: 'செடியின் கீழ் உள்ள 12 அங்குல இலைகளை வெட்டிவிடவும். பக்கக் கிளைகளைக் கிள்ளி கம்பு நட்டு கட்டி விடவும் (Staking).',
      tanglish: 'Bottom 12 inch foliage cut pannunga splash infection aagatha mathiri. Staking kambu katti vidunga.',
      whenToPrune: 'Every 15 days, prune lower yellowing foliage and side shoots'
    },
    harvesting: {
      en: 'Harvest fruits at breaker / turning stage (pinkish red) for distant transport, or fully ripe red for local markets.',
      ta: 'வெளியூர் அனுப்ப பிங்க் நிறத்தில் இருக்கும் போதும், உள்ளூர் விற்பனைக்கு நன்கு பழுத்த சிவப்பு நிறத்திலும் பறிக்கவும்.',
      tanglish: 'Breaker stage (pink red) or fully ripe red-la harvest pannunga.',
      maturitySigns: 'Color turns from green to orange-red; glossy skin',
      expectedYield: '14 - 20 tonnes / acre'
    }
  },
  {
    id: 'potato_crop',
    name: 'Potato',
    tamilName: 'உருளைக்கிழங்கு',
    tanglishName: 'Urulaikilangu (Potato)',
    scientificName: 'Solanum tuberosum',
    category: 'Vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=80',
    growthDuration: '90 - 110 Days',
    difficulty: 'Moderate',
    summary: {
      en: 'Major underground tuber crop that prefers cool weather, loose well-aerated sandy soil, high earthing-up, and blight prevention.',
      ta: 'குளிர்ச்சியான தட்பவெப்பநிலை விரும்பும் கிழங்குப் பயிர். நல்ல மண் அணைப்பு மற்றும் பொட்டாஷ் உரம் மூலம் பெரிய கிழங்குகளைப் பெறலாம்.',
      tanglish: 'Cool climate tuber crop. Loose well-aerated soil and high earthing-up panna nalla tuber size varum.'
    },
    watering: {
      en: 'Light and frequent furrow irrigation every 5-7 days. Avoid dry spells during tuber initiation (30-50 days). Stop watering 10 days before harvest.',
      ta: '5-7 நாட்களுக்கு ஒருமுறை பார்களில் நீர் பாய்ச்சவும். கிழங்கு உருவாகும் 30-50 நாட்களில் தண்ணீர் பற்றாக்குறை இருக்கக்கூடாது.',
      tanglish: 'Every 5-7 days furrow irrigation pannanum. Tuber formation stage-la water stress vara koodathu.',
      frequency: 'Every 5-7 days',
      method: 'Furrow irrigation'
    },
    temperature: {
      en: 'Ideal vegetative growth: 20°C to 24°C; Tuberization occurs best at night temperatures between 15°C and 18°C.',
      ta: 'வளர்ச்சிக்கு 20°C-24°C, கிழங்கு திரள இரவு வெப்பநிலை 15°C-18°C தேவை. 30°Cக்கு மேல் கிழங்கு உருவாகாது.',
      tanglish: 'Day 20-24°C, Night 15-18°C best for tuber formation. High heat tuberization-ah block pannum.',
      idealRange: '15°C - 22°C'
    },
    sunlight: {
      en: 'Requires 6 to 8 hours of sunshine. Tuber formation is triggered by short days and cool nights.',
      ta: 'தினமும் 6 முதல் 8 மணி நேரம் சூரிய ஒளி தேவை.',
      tanglish: 'Daily 6-8 hours sun light thevai.',
      hours: '6 - 8 Hours Daily'
    },
    soilCare: {
      en: 'Deep, loose, fertile sandy loam with high organic humus. Soil pH 5.2 to 6.4 (slightly acidic helps prevent Potato Scab).',
      ta: 'மட்கிய கரிம உரம் நிறைந்த மணல் கலந்த செம்மண் சிறந்தது. pH அளவு 5.2 முதல் 6.4 வரை இருக்க வேண்டும்.',
      tanglish: 'Loose sandy loam soil. pH 5.2 - 6.4 irunthaal potato scab noi varaathu.',
      ph: '5.2 - 6.4',
      soilType: 'Loose Sandy Loam'
    },
    soilTilling: {
      en: 'Deep ploughing twice followed by fine tilth with rotavator. Form ridges spaced 50-60 cm apart.',
      ta: 'நிலத்தை 25 செ.மீ ஆழத்திற்கு நன்கு உழுது கட்டிகள் இல்லாமல் புழுதியாக்கி 50-60 செ.மீ இடைவெளியில் பார் அமைக்கவும்.',
      tanglish: '2 times deep plough panni fine soil-ah maathi 50-60cm ridges form pannanum.',
      prepStep: 'Fine tilth loose soil bed with 50-60 cm ridges'
    },
    fertilizing: {
      en: 'NPK 120:100:120 kg/acre. High Potassium (MOP or Sulfate of Potash) is vital for tuber sizing and starch accumulation.',
      ta: 'ஏக்கருக்கு NPK 120:100:120 கிலோ. உருளைக்கிழங்கு பெருக்க பொட்டாஷ் உரம் மிக முக்கியம்.',
      tanglish: 'High Potash requirement. NPK 120:100:120 kg/acre. Basal-la phosphorus and half potash podunga.',
      npk: '120:100:120 kg/acre',
      organic: '15 tonnes well-rotted FYM/acre'
    },
    repotting: {
      en: 'Plant certified, well-sprouted seed tubers (40-50g weight) 5-7 cm deep at 20 cm plant-to-plant distance along the ridge.',
      ta: 'முளைவிட்ட 40-50 கிராம் எடையுள்ள விதைக்கிழங்குகளை 5-7 செ.மீ ஆழத்தில் 20 செ.மீ இடைவெளியில் நடவும்.',
      tanglish: 'Sprouted seed tubers-ah (40-50g) 20cm distance-la 5-7cm aazhathula ridge-la veinga.',
      spacing: '60 x 20 cm',
      seedlingAge: 'Sprouted Seed Tubers (2-3 eyes sprouted)'
    },
    pestControl: {
      en: 'Potato Tuber Moth (PTM), Aphids, Cutworms. Keep tubers well-covered with soil (high earthing-up). Spray Chlorpyrifos 20% EC @ 2ml/L.',
      ta: 'கிழங்கு புழு (PTM), அசுவினி. கிழங்குகள் வெளியே தெரியாதவாறு நன்கு மண் அணைக்க வேண்டும்.',
      tanglish: 'Potato tuber moth, aphids. Mann nalla anaithu tuber veliya theriyaama paathukonga.',
      majorPests: ['Potato Tuber Moth (கிழங்கு அந்துப்பூச்சி)', 'Aphids (அசுவினி)', 'Cutworms (வெட்டுப்புழு)'],
      remedy: 'High earthing-up + Neem oil 5ml/L or Imidacloprid 0.5ml/L'
    },
    disease: {
      en: 'Late Blight (Phytophthora infestans), Early Blight, Black Scurf. Spray Ridomil MZ (Metalaxyl + Mancozeb) @ 2.5g/L immediately.',
      ta: 'பிற்பருவக் கருகல் நோய் (Late Blight). ரிடோமில் (Ridomil MZ) 2.5 கிராம்/லிட்டர் நீரில் கலந்து உடனடியாக தெளிக்கவும்.',
      tanglish: 'Late Blight dangerous noi. Ridomil MZ 2.5g per litre water-la mix panni spray pannunga.',
      majorDiseases: ['Late Blight (பிற்பருவக் கருகல்)', 'Early Blight', 'Common Scab'],
      remedy: 'Metalaxyl + Mancozeb (Ridomil MZ) @ 2.5g/L'
    },
    humidity: {
      en: '60% - 80%. Persistent fog, drizzle, and relative humidity >90% create explosive Late Blight epidemics.',
      ta: '60% - 80% ஈரப்பதம். அதிக பனிமூட்டம் மற்றும் சாரல் மழை இருக்கும் போது நோய் தாக்குதல் அதிகம் இருக்கும்.',
      tanglish: '60% - 80% humidity. Heavy fog irunthaal preventive fungicide spray pannanum.',
      idealRange: '60% - 80%'
    },
    sowing: {
      en: 'Seed rate: 800 - 1000 kg seed tubers per acre. Dip tubers in Trichoderma (10g/L) or Mancozeb (2g/L) for 15 minutes before planting.',
      ta: 'விதை அளவு: ஏக்கருக்கு 800-1000 கிலோ விதைக்கிழங்குகள். நடவுக்கு முன் மேன்கோசெப் கரைசலில் நனைத்து நடவும்.',
      tanglish: 'Seed rate 800-1000 kg tubers per acre. Mancozeb dip panni shade dry panni plant pannunga.',
      season: 'Autumn (Oct), Spring (Jan), Summer (Hills: Apr-May)',
      seedRate: '800 - 1000 kg tubers/acre'
    },
    pruning: {
      en: 'Earthing-up (Mann anaithal) is crucial twice: first at 30 days after planting, second at 50 days to prevent greening of tubers by sunlight.',
      ta: 'நடவு செய்த 30 மற்றும் 50 ஆம் நாட்களில் கட்டாயம் மண் அணைக்க வேண்டும். கிழங்குகளில் வெயில் பட்டால் பச்சையாக மாறி நஞ்சாகிவிடும்.',
      tanglish: '30 and 50 days-la compulsory mann anaikanum. Sunlight pattal solanine poison aagi tuber green color-ah maarum.',
      whenToPrune: 'Earthing-up at 30 & 50 DAP; dehaulming 10 days before harvest'
    },
    harvesting: {
      en: 'Cut top foliage (Dehaulming) 10 days before harvest to harden the tuber skin. Dig carefully with fork or potato digger.',
      ta: 'செடிகள் மஞ்சள் நிறமாகி காய்ந்ததும், அறுவடைக்கு 10 நாட்களுக்கு முன் தழைகளை வெட்டிவிட்டு கிழங்குகளை காயப்படாமல் தோண்டி எடுக்கவும்.',
      tanglish: 'Harvest-ku 10 days mun top plants-ah cut panni skin harden aana pin thondi edukka vendum.',
      maturitySigns: 'Leaves turn yellow and dry; tuber skin does not peel off with thumb pressure',
      expectedYield: '8 - 12 tonnes / acre'
    }
  },
  {
    id: 'chilli_crop',
    name: 'Chilli / Hot Pepper',
    tamilName: 'மிளகாய்',
    tanglishName: 'Milagai (Chilli)',
    scientificName: 'Capsicum annuum',
    category: 'Spice',
    imageUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&auto=format&fit=crop&q=80',
    growthDuration: '120 - 150 Days',
    difficulty: 'Moderate',
    summary: {
      en: 'High-value spice crop requiring sunny weather, well-drained fertile loam, strict sucking-pest control to avoid leaf curl, and balanced micronutrients.',
      ta: 'அதிக லாபம் தரும் பணப்பயிர். இலைச்சுருட்டல் நோயைக் கட்டுப்படுத்தி நுண்ணூட்டம் இட்டால் அதிக விளைச்சல் கிடைக்கும்.',
      tanglish: 'High value cash crop. Sucking pest and leaf curl control pannina continuous harvest edukalam.'
    },
    watering: {
      en: 'Irrigate every 4 to 6 days. Avoid waterlogging which causes damping off, and avoid drought which induces flower dropping.',
      ta: '4 முதல் 6 நாட்களுக்கு ஒருமுறை நீர் பாய்ச்சவும். தண்ணீர் தேங்கினால் வேரழுகல் வரும்; தண்ணீர் குறைந்தால் பூக்கள் கொட்டும்.',
      tanglish: 'Every 4-6 days regular-ah water vidunga. Water stagnant aanaal root rot varum, drought aanaal poo kottum.',
      frequency: 'Every 4 - 6 days',
      method: 'Drip or alternate ridge irrigation'
    },
    temperature: {
      en: 'Optimum: 20°C to 30°C. Temperature above 35°C during flowering causes flower and immature pod shed.',
      ta: 'உகந்த வெப்பநிலை: 20°C முதல் 30°C வரை.',
      tanglish: 'Optimum 20°C - 30°C.',
      idealRange: '20°C - 30°C'
    },
    sunlight: {
      en: 'Requires full intense sun (7 to 9 hours daily). Adequate sunlight enhances fruit pungency and deep red color.',
      ta: 'தினமும் 7 முதல் 9 மணி நேரம் நல்ல வெயில் தேவை.',
      tanglish: 'Daily 7-9 hours direct sunshine thevai.',
      hours: '7 - 9 Hours Daily'
    },
    soilCare: {
      en: 'Deep, friable, well-aerated black clay loam or sandy red loam rich in organic matter. Soil pH 6.0 to 7.5.',
      ta: 'கரிசல் மண் அல்லது மணல் கலந்த செம்மண் சிறந்தது. pH அளவு 6.0 முதல் 7.5 வரை.',
      tanglish: 'Black cotton or sandy red loam soil best. pH 6.0 - 7.5.',
      ph: '6.0 - 7.5',
      soilType: 'Well-drained Black / Red Loam'
    },
    soilTilling: {
      en: 'Plough field 3 times to obtain fine tilth. Form ridges and furrows 60 cm apart or raised beds with drip lines and silver mulch.',
      ta: 'நிலத்தை 3 முறை உழுது புழுதியாக்கி 60 செ.மீ இடைவெளியில் பார் அமைக்கவும் அல்லது வெள்ளி மூடாக்கு தாள் (Mulch) போடவும்.',
      tanglish: 'Fine tilth panni 60cm ridges or raised bed with silver mulch sheet use pannuvathu romba nallathu.',
      prepStep: 'Fine tilth bed with ridges or silver mulch film'
    },
    fertilizing: {
      en: 'NPK 50:25:25 kg/acre. Apply 50% nitrogen + all phosphorus and potassium as basal. Top-dress remaining nitrogen in 2 equal splits.',
      ta: 'ஏக்கருக்கு NPK 50:25:25 கிலோ. அடியுரமாக பாஸ்பரஸ் மற்றும் பாதியளவு தழை, சாம்பல் சத்து இடவும். மீதியை 30 மற்றும் 60 நாட்களில் இடவும்.',
      tanglish: 'NPK 50:25:25 kg/acre. Micronutrient spray (Zinc + Boron) flowering-la spray pannanum.',
      npk: '50:25:25 kg/acre',
      organic: 'FYM 10 tonnes/acre + Neem cake 100 kg/acre'
    },
    repotting: {
      en: 'Transplant 30 to 35-day-old vigorous seedlings at 60 x 45 cm spacing during late afternoon. Dip roots in Pseudomonas solution.',
      ta: '30-35 நாள் வயதுடைய நாற்றுகளை மாலை வேளையில் 60x45 செ.மீ இடைவெளியில் நடவு செய்யவும். வேர்களை சூடோமோனாஸ் கரைசலில் நனைத்து நடவும்.',
      tanglish: '30-35 days seedlings-ah 60x45 cm space-la plant pannunga. Root dip in Pseudomonas.',
      spacing: '60 x 45 cm (Hybrids: 75 x 60 cm)',
      seedlingAge: '30 - 35 Days'
    },
    pestControl: {
      en: 'Thrips, Yellow Mites, Whiteflies (vectors of Leaf Curl). Spray Acetamiprid 20% SP @ 0.5g/L or Diafenthiuron 50% WP @ 1.2g/L.',
      ta: 'இலைப்பேன் (Thrips), சிலந்தி, வெள்ளை ஈ. அசிடமிப்ரிட் 0.5 கிராம்/லிட்டர் அல்லது வேப்பெண்ணெய் 5மி.லி + மஞ்சள் நிற ஒட்டும் பொறிகள் வைக்கவும்.',
      tanglish: 'Thrips, Mites, Whitefly. Acetamiprid 0.5g or Neem oil 5ml spray pannunga. Blue and Yellow sticky traps veinga.',
      majorPests: ['Thrips (இலைப்பேன்)', 'Yellow Mites (மஞ்சள் சிலந்தி)', 'Fruit Borer (காய்ப்புழு)'],
      remedy: 'Neem oil 5ml/L + Acetamiprid 0.5g/L + Yellow & Blue sticky traps'
    },
    disease: {
      en: 'Anthracnose / Fruit Rot (Dieback), Powdery Mildew, Chilli Leaf Curl Virus. Spray Azoxystrobin 23% SC @ 1ml/L or Mancozeb @ 2.5g/L.',
      ta: 'காய் அழுகல் (Anthracnose), சாம்பல் நோய், இலைச்சுருட்டல். அசோக்ஸிஸ்ட்ரோபின் 1 மி.லி அல்லது மேன்கோசெப் 2.5 கிராம்/லிட்டர் தெளிக்கவும்.',
      tanglish: 'Kaai azhugal (Dieback), Powdery mildew. Azoxystrobin 1ml per litre spray pannunga.',
      majorDiseases: ['Anthracnose / Dieback (காய் அழுகல்)', 'Chilli Leaf Curl Virus (இலைச்சுருட்டல்)', 'Powdery Mildew (சாம்பல் நோய்)'],
      remedy: 'Azoxystrobin 1ml/L or Copper Oxychloride 2.5g/L'
    },
    humidity: {
      en: '50% - 65%. High humidity triggers Anthracnose dieback; hot dry weather increases thrips infestation.',
      ta: '50% - 65% ஈரப்பதம். காற்றில் அதிக ஈரப்பதம் இருந்தால் காய் அழுகல் நோய் தாக்கும்.',
      tanglish: '50% - 65% humidity.',
      idealRange: '50% - 65%'
    },
    sowing: {
      en: 'Seed rate: 400g/acre for varieties, 100g/acre for hybrids. Sow in protrays filled with sterilized coco peat.',
      ta: 'விதை அளவு: ஏக்கருக்கு நாட்டு ரகங்கள் 400 கிராம், வீரிய ரகங்கள் 100 கிராம்.',
      tanglish: 'Seed rate 100g hybrid seeds. Protray nursery best.',
      season: 'Jul - Aug (Kharif), Oct - Nov (Rabi), Jan - Feb (Summer)',
      seedRate: '100 g/acre (Hybrid)'
    },
    pruning: {
      en: 'Nip terminal shoot at 35-40 days after transplanting (Pinching) to encourage vigorous lateral branching and higher pod clusters.',
      ta: 'நடவு செய்த 35-40 ஆம் நாளில் செடியின் நுனிக் குருத்தை கிள்ளிவிடவும் (Pinching). இதனால் பக்கக் கிளைகள் அதிகமாகத் தோன்றி காய் பிடிக்கும்.',
      tanglish: '35-40 days-la tip pinching panna nalla side branches varum and yield double aagum.',
      whenToPrune: 'Tip pinching at 35-40 DAT'
    },
    harvesting: {
      en: 'For green chillies: Pick fully developed firm green fruits every 8-10 days. For dry red chillies: Pick fully ripe dark red pods.',
      ta: 'பச்சை மிளகாய்க்கு 8-10 நாட்களுக்கு ஒருமுறை காய்களைப் பறிக்கவும். வத்தல் மிளகாய்க்கு நன்கு பழுத்த சிவப்பு காய்களைப் பறித்துக் காயவைக்கவும்.',
      tanglish: 'Green chilli 8-10 days-ku oru thadava harvest pannalam. Red dry chilli-ku fully red aana pin pick pannunga.',
      maturitySigns: 'Firm, glossy green pods (for green chilli) or dark deep red (for dry chilli)',
      expectedYield: 'Green: 6 - 8 tonnes/acre; Dry: 1.2 - 1.8 tonnes/acre'
    }
  },
  {
    id: 'banana_crop',
    name: 'Banana',
    tamilName: 'வாழை',
    tanglishName: 'Vazhai (Banana)',
    scientificName: 'Musa acuminata',
    category: 'Fruit',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&auto=format&fit=crop&q=80',
    growthDuration: '11 - 13 Months',
    difficulty: 'Easy',
    summary: {
      en: 'Rapid-growing tropical giant herb requiring abundant sunshine, high potassium feeding, heavy watering, and de-suckering.',
      ta: 'அதிக நீர் மற்றும் பொட்டாஷ் சத்து தேவைப்படும் ஆண்டுப் பயிர். சரியான கன்று மேலாண்மை மற்றும் தார் பராமரிப்பு மூலம் கூடுதல் எடை பெறலாம்.',
      tanglish: 'Continuous harvest tharum fruit crop. High water and high potassium thevai.'
    },
    watering: {
      en: 'Heavy water consumer. Requires 20-30 liters per plant daily via drip. Maintain moist soil; avoid stagnant water around corm.',
      ta: 'மரம் ஒன்றுக்கு தினமும் 20-30 லிட்டர் தண்ணீர் சொட்டுநீர் மூலம் பாய்ச்சவும். கிழங்கு பகுதியில் நீர் தேங்கக்கூடாது.',
      tanglish: 'Daily 20-30 litres per plant drip irrigation best. Corm-la water stagnant aaga koodathu.',
      frequency: 'Daily via drip (or every 3-4 days furrow)',
      method: 'Drip fertigation ring'
    },
    temperature: {
      en: 'Optimum: 26°C to 35°C. Growth stops below 12°C, and chilling injury occurs under 8°C.',
      ta: 'உகந்த வெப்பநிலை: 26°C முதல் 35°C வரை.',
      tanglish: '26°C - 35°C ideal.',
      idealRange: '26°C - 35°C'
    },
    sunlight: {
      en: 'Requires full tropical sun (8 to 10 hours daily). Shade causes thin pseudo-stems and delayed flowering.',
      ta: 'தினமும் 8 முதல் 10 மணி நேரம் நேரடி சூரிய ஒளி தேவை.',
      tanglish: 'Daily 8-10 hours full sunshine thevai.',
      hours: '8 - 10 Hours Daily'
    },
    soilCare: {
      en: 'Deep, rich, well-drained loamy alluvial soil with good organic content. Soil depth minimum 1 meter. pH 6.0 to 7.5.',
      ta: 'வண்டல் மண் அல்லது ஆற்றுப்படுகை மண் மிகச் சிறந்தது. மண் ஆழம் குறைந்தது 1 மீட்டர் இருக்க வேண்டும். pH 6.0 முதல் 7.5.',
      tanglish: 'Deep rich alluvial or fertile loamy soil. Minimum 1 meter depth. pH 6.0 - 7.5.',
      ph: '6.0 - 7.5',
      soilType: 'Deep Alluvial Loam'
    },
    soilTilling: {
      en: 'Deep ploughing twice. Dig planting pits of 45 x 45 x 45 cm or 60 x 60 x 60 cm. Fill with topsoil, 10 kg FYM, and 250g Neem cake.',
      ta: 'நிலத்தை ஆழமாக உழுது 45x45x45 செ.மீ குழிகள் எடுத்து, மட்கிய எரு 10 கிலோ மற்றும் 250 கிராம் வேப்பம்பிண்ணாக்கு இட்டு மூடவும்.',
      tanglish: '45x45x45 cm pits eduthu, manure and neem cake mix panni kuzhi moodanum.',
      prepStep: 'Dig 45x45x45 cm pits filled with FYM & neem cake'
    },
    fertilizing: {
      en: 'NPK 200:50:300 g per plant. High Potash (MOP) given in 5-6 split monthly doses from 2nd month to shooting.',
      ta: 'மரம் ஒன்றுக்கு தழை 200 கிராம், மணி 50 கிராம், சாம்பல் சத்து 300 கிராம். பொட்டாஷ் உரத்தை பிரித்து மாதந்தோறும் இடவும்.',
      tanglish: 'Per plant NPK 200:50:300g. Monthly split dose-la Potash podunga. Bunch size perusa varum.',
      npk: 'NPK 200:50:300 g/plant',
      organic: '15 kg Farmyard Manure + 500g Neem cake per tree'
    },
    repotting: {
      en: 'Plant sword suckers (1.5-2.0 kg) or tissue culture plantlets at 1.8 x 1.8 m or 2.1 x 2.1 m. Pare sucker corms and dip in carbendazim (2g/L).',
      ta: 'ஈட்டி இலைக் கன்றுகளை (1.5 - 2 கிலோ எடை) அல்லது திசு வளர்ப்பு நாற்றுகளை 1.8x1.8 மீட்டர் இடைவெளியில் நடவும்.',
      tanglish: 'Sword suckers or tissue culture plants 1.8 x 1.8 meter distance-la plant pannunga.',
      spacing: '1.8 x 1.8 m (Cavendish) / 2.1 x 2.1 m (Poovan)',
      seedlingAge: 'Sword suckers (3-4 months old) or tissue culture'
    },
    pestControl: {
      en: 'Pseudostem Borer, Rhizome Weevil, Aphids (bunchy top vector). Apply Carbofuran 3G @ 20g/pit or inject Monocrotophos.',
      ta: 'தண்டு துளைப்பான் வண்டு, கிழங்கு வண்டு, அசுவினி. தண்டு துளைப்பானைக் கட்டுப்படுத்த வேப்பங்கொட்டை கரைசல் தெளிக்கவும்.',
      tanglish: 'Stem weevil, rhizome borer. Paring and pralinage panni neem cake podunga.',
      majorPests: ['Pseudostem Weevil (தண்டு வண்டு)', 'Rhizome Weevil (கிழங்கு வண்டு)', 'Banana Aphid (அசுவினி)'],
      remedy: 'Neem cake 250g/plant + Beauveria bassiana 10g/L'
    },
    disease: {
      en: 'Sigatoka Leaf Spot, Panama Wilt (Fusarium), Bunchy Top Virus. Spray Propiconazole 25% EC @ 1ml/L + mineral oil for Sigatoka.',
      ta: 'சிகாடோகா இலைப்புள்ளி நோய், பனாமா வாடல் நோய், கொத்து முடி நோய். புரொபிகோனசோல் 1 மி.லி/லிட்டர் தெளிக்கவும்.',
      tanglish: 'Sigatoka leaf spot, Panama wilt. Propiconazole 1ml/L spray pannunga. Infected yellow leaves cut pannidunga.',
      majorDiseases: ['Sigatoka Leaf Spot (இலைப்புள்ளி)', 'Panama Wilt (வாடல் நோய்)', 'Banana Bunchy Top Virus'],
      remedy: 'Propiconazole 1ml/L + Trichoderma viride soil drench'
    },
    humidity: {
      en: '75% - 85%. Adequate moisture in air promotes large lush leaves and fast bunch development.',
      ta: '75% - 85% ஈரப்பதம் சிறந்தது.',
      tanglish: '75% - 85% humidity best.',
      idealRange: '75% - 85%'
    },
    sowing: {
      en: 'Planting material: Healthy disease-free sword suckers or authenticated secondary-hardened tissue culture plants.',
      ta: 'நோய் தாக்காத நல்ல ஈட்டி இலைக் கன்றுகள் அல்லது சான்றளிக்கப்பட்ட திசு வளர்ப்பு கன்றுகள்.',
      tanglish: 'Certified disease-free suckers or tissue culture plants.',
      season: 'Feb - Apr (Summer crop), Aug - Oct (Monsoon crop)',
      seedRate: '1,200 plants/acre'
    },
    pruning: {
      en: 'De-suckering: Remove all unwanted side suckers every month until shooting; retain only 1 follower sucker after bunch emergence. Remove dead dry leaves.',
      ta: 'கன்று நீக்குதல் (De-suckering): பூ தள்ளும் வரை தோன்றும் பக்கக் கன்றுகளை மாதந்தோறும் வெட்டி அழிக்கவும். காய்ந்த இலைகளை அப்புறப்படுத்தவும்.',
      tanglish: 'Side suckers-ah monthly cut pannanum. Bunch vantha pin mattum 1 follower sucker vidalam. Dry leaves cut pannunga.',
      whenToPrune: 'Monthly de-suckering and dry leaf pruning'
    },
    harvesting: {
      en: 'Harvest when bunch fingers are plump, ridges become rounded (75-80% maturity for export, 90% for local market), approx. 100-110 days after flowering.',
      ta: 'வாழைக்காயின் கூர்மையான விளிம்புகள் மறைந்து உருண்டையாக மாறும் போது (பூ பூத்த 100-110 நாட்களில்) தாரை அறுவடை செய்யவும்.',
      tanglish: 'Fingers round aagi angles disappear aagum pothu (100 days after flower) bunch harvest pannunga.',
      maturitySigns: 'Fingers become round and plump; dried floral remnants drop easily',
      expectedYield: '25 - 35 tonnes / acre'
    }
  },
  {
    id: 'cotton_crop',
    name: 'Cotton',
    tamilName: 'பருத்தி',
    tanglishName: 'Paruthi (Cotton)',
    scientificName: 'Gossypium hirsutum',
    category: 'Cash Crop',
    imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&auto=format&fit=crop&q=80',
    growthDuration: '150 - 180 Days',
    difficulty: 'Advanced',
    summary: {
      en: 'Major fiber cash crop thriving in deep black soils, demanding full sun, strict bollworm management, and balanced micronutrient sprays.',
      ta: 'முக்கியமான பணப்பயிர். கரிசல் மண்ணில் செழித்து வளரும். காய்ப்புழுக்களை கட்டுப்படுத்தி சரியான நேரத்தில் இலைவழியாக உரம் இட்டால் அதிக பருத்தி பஞ்சு கிடைக்கும்.',
      tanglish: 'Important cash crop. Black soil-la nalla yield varum. Bollworm control and nutrient management mukkiyam.'
    },
    watering: {
      en: 'Critical stages for watering: Squaring (45-50 days), Flowering (70-75 days), and Boll Development (90-100 days). Avoid waterlogging.',
      ta: 'பூக்கும் பருவம், காய் பிடிக்கும் பருவம் ஆகிய நிலைகளில் கட்டாயம் தண்ணீர் பாய்ச்ச வேண்டும். நீர் தேங்கக்கூடாது.',
      tanglish: 'Squaring, flowering and boll development stages-la water stress vara koodathu.',
      frequency: 'Every 10 - 14 days',
      method: 'Furrow irrigation'
    },
    temperature: {
      en: 'Optimum: 24°C to 35°C. Warm days and cool nights during boll opening enhance fiber quality.',
      ta: 'உகந்த வெப்பநிலை: 24°C முதல் 35°C வரை.',
      tanglish: '24°C - 35°C ideal.',
      idealRange: '24°C - 35°C'
    },
    sunlight: {
      en: 'Requires full bright direct sun (8 to 10 hours daily). Cloudy weather causes flower and boll shedding.',
      ta: 'தினமும் 8 முதல் 10 மணி நேரம் முழுமையான வெயில் தேவை.',
      tanglish: 'Daily 8-10 hours full sunshine thevai.',
      hours: '8 - 10 Hours Daily'
    },
    soilCare: {
      en: 'Deep black cotton soils (Vertisols) or well-drained deep alluvial loam with high moisture-retention capacity. pH 7.0 to 8.5.',
      ta: 'கரிசல் மண் அல்லது ஆழமான வண்டல் மண் சிறந்தது. pH அளவு 7.0 முதல் 8.5 வரை.',
      tanglish: 'Deep black cotton soil is best. Moisture retention capacity high. pH 7.0 - 8.5.',
      ph: '7.0 - 8.5',
      soilType: 'Deep Black Cotton Soil'
    },
    soilTilling: {
      en: 'Deep summer ploughing followed by 2 cross-harrowings. Form ridges and furrows at 90 cm or 120 cm spacing.',
      ta: 'கோடை உழவு செய்து கட்டிகளை உடைத்து 90 செ.மீ அல்லது 120 செ.மீ இடைவெளியில் பார் அமைக்கவும்.',
      tanglish: 'Deep summer ploughing panni 90cm or 120cm ridges & furrows form pannanum.',
      prepStep: 'Deep ploughing + ridges at 90-120 cm'
    },
    fertilizing: {
      en: 'NPK 80:40:40 kg/acre. Apply DAP basal. Split nitrogen and potash at 30, 60, and 90 days. Spray Magnesium sulphate 1% to prevent leaf reddening.',
      ta: 'ஏக்கருக்கு NPK 80:40:40 கிலோ. இலைகள் சிவப்பாக மாறுவதைத் தடுக்க மெக்னீசியம் சல்பேட் 1% தெளிக்கவும்.',
      tanglish: 'NPK 80:40:40 kg/acre. Leaf reddening thadukka Magnesium sulphate 1% spray pannunga.',
      npk: '80:40:40 kg/acre',
      organic: '5 tonnes Farmyard Manure/acre'
    },
    repotting: {
      en: 'Direct sown. Space hybrid cotton seeds at 90 x 60 cm or 120 x 60 cm. Thin to single healthy plant per hill at 20 days.',
      ta: '90x60 செ.மீ இடைவெளியில் விதைகளை ஊன்றவும். 20 ஆம் நாளில் குத்துக்கு ஒரு செடியை மட்டும் விட்டுவிட்டு மற்றவற்றை நீக்கவும் (Thinning).',
      tanglish: '90x60 cm space-la seeds sow pannunga. 20 days-la 1 plant per hill maintain pannunga.',
      spacing: '90 x 60 cm (Hybrids: 120 x 60 cm)',
      seedlingAge: 'Direct Seed Sown'
    },
    pestControl: {
      en: 'Pink Bollworm, American Bollworm, Jassids, Whitefly. Install Pheromone traps @ 5/acre. Spray Spinetoram 11.7% SC @ 1ml/L or Neem oil 5ml/L.',
      ta: 'இளஞ்சிவப்பு காய்ப்புழு (Pink Bollworm), அசுவினி, தத்துப் பூச்சி. ஏக்கருக்கு 5 இனக்கவர்ச்சிப் பொறிகள் வைக்கவும்.',
      tanglish: 'Pink bollworm, whitefly. Pheromone traps 5 per acre veinga. Spinetoram 1ml/L spray pannalam.',
      majorPests: ['Pink Bollworm (இளஞ்சிவப்பு காய்ப்புழு)', 'Whitefly (வெள்ளை ஈ)', 'Jassids (தத்துப்பூச்சி)'],
      remedy: 'Pheromone traps + Spinetoram 1ml/L or Neem oil 5ml/L'
    },
    disease: {
      en: 'Bacterial Blight (Black arm), Grey Mildew, Root Rot. Spray Copper Oxychloride 50% WP @ 2.5g/L + Streptocycline @ 0.1g/L.',
      ta: 'பாக்டீரியா கருகல் நோய் (கோண இலைப்புள்ளி), சாம்பல் நோய். காப்பர் ஆக்ஸிகுளோரைடு 2.5 கிராம் + ஸ்ட்ரெப்டோசைக்ளின் 0.1 கிராம்/லிட்டர் தெளிக்கவும்.',
      tanglish: 'Bacterial Blight / Angular leaf spot. Copper Oxychloride 2.5g + Streptocycline 0.1g spray pannunga.',
      majorDiseases: ['Bacterial Blight (கோண இலைப்புள்ளி)', 'Grey Mildew (சாம்பல் நோய்)', 'Root Rot (வேரழுகல்)'],
      remedy: 'Copper Oxychloride 2.5g/L + Streptocycline 0.1g/L'
    },
    humidity: {
      en: '50% - 70%. High humidity during boll bursting damages lint and causes fiber discoloration.',
      ta: '50% - 70% ஈரப்பதம். வெடிக்கும் போது மழை பெய்தால் பஞ்சு சேதமடையும்.',
      tanglish: '50% - 70% humidity. Boll burst aagum pothu rain vara koodathu.',
      idealRange: '50% - 70%'
    },
    sowing: {
      en: 'Seed rate: 1.0 - 1.5 kg/acre for Bt hybrids. Use acid-delinted seeds treated with Imidacloprid (5g/kg) and Pseudomonas (10g/kg).',
      ta: 'விதை அளவு: ஏக்கருக்கு 1.0 - 1.5 கிலோ (வீரிய ஒட்டு). அமில விதைநேர்த்தி செய்யப்பட்ட விதைகளை விதைக்கவும்.',
      tanglish: 'Seed rate 1.0 - 1.5 kg per acre. Acid delinted seeds seed treatment panni sow pannunga.',
      season: 'Winter Cambodia (Aug - Sep), Summer Cambodia (Feb - Mar)',
      seedRate: '1.0 - 1.5 kg/acre'
    },
    pruning: {
      en: 'Topping: Nip off terminal vegetative bud at 75-80 days (at 15-18th node) to arrest vegetative growth and divert energy to boll development.',
      ta: 'நுனிக் குருத்து கிள்ளுதல் (Topping): 75-80 ஆம் நாளில் செடியின் உச்சி குருத்தை கிள்ளிவிட்டால் பக்கக் கிளைகளில் காய்கள் அதிகமாகப் பிடிக்கும்.',
      tanglish: '75-80 days-la terminal bud-ah nip pannunga (Topping). Vegetative growth stop aagi bolls nalla perusagum.',
      whenToPrune: 'Terminal bud topping at 75-80 DAS'
    },
    harvesting: {
      en: 'Pick clean seed cotton early morning after dew dries, from fully opened clean bolls every 10-15 days. Avoid picking stained/wet cotton.',
      ta: 'பஞ்சு முழுமையாக வெடித்தவுடன் பனி காய்ந்த பின் காலை வேளையில் பறிக்கவும். காய்ந்த இலை சருகுகள் பஞ்சில் சேராதவாறு சுத்தமாகப் பறிக்கவும்.',
      tanglish: 'Morning dew dried aana pin fully burst bolls-la irunthu clean cotton pick pannunga.',
      maturitySigns: 'Bolls burst open exposing fluffy clean white lint',
      expectedYield: '800 - 1,200 kg seed cotton/acre'
    }
  },
  {
    id: 'mango_crop',
    name: 'Mango',
    tamilName: 'மாமரம்',
    tanglishName: 'Maamaram (Mango)',
    scientificName: 'Mangifera indica',
    category: 'Fruit',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80',
    growthDuration: 'Perennial (Bearing 3-4 years)',
    difficulty: 'Easy',
    summary: {
      en: 'King of Fruits. Long-lived orchard tree thriving in deep loamy soil, requiring winter dry spell for flower induction and protection from Anthracnose and leafhoppers.',
      ta: 'பழங்களின் அரசன். நல்ல வடிகால் வசதியுள்ள செம்மண்ணில் நன்கு வளரும். பூக்கும் பருவத்தில் தத்துப்பூச்சி மற்றும் சாம்பல் நோயைக் கட்டுப்படுத்துவது அவசியம்.',
      tanglish: 'King of Fruits. Pookkum samayam leafhopper and powdery mildew control panna nalla kaai pidikkum.'
    },
    watering: {
      en: 'Water young trees weekly. For mature bearing trees, withhold irrigation for 2 months before flowering to induce bloom; resume irrigation after fruit set.',
      ta: 'இளம் செடிகளுக்கு வாரம் ஒருமுறை நீர் பாய்ச்சவும். பெரிய மரங்களுக்கு பூ பூப்பதற்கு 2 மாதங்கள் முன் தண்ணீர் நிறுத்தி, காய் பிடித்த பின் 10 நாட்களுக்கு ஒருமுறை பாய்ச்சவும்.',
      tanglish: 'Young trees weekly water. Bearing trees-ku flowering mun 2 months water stop panni, kaai pidicha pin regular water vidunga.',
      frequency: 'Every 10 - 15 days during fruit sizing',
      method: 'Basin / Drip around tree canopy drip-line'
    },
    temperature: {
      en: 'Optimum: 24°C to 32°C. Frost is fatal to young trees; unseasonal winter rains damage flower panicles.',
      ta: 'உகந்த வெப்பநிலை: 24°C முதல் 32°C வரை. பூக்கும் போது மழை பெய்தால் மகசூல் பாதிக்கப்படும்.',
      tanglish: '24°C - 32°C ideal.',
      idealRange: '24°C - 32°C'
    },
    sunlight: {
      en: 'Requires full bright direct sun (8 to 10 hours daily). Ample sun enhances fruit sweetness and color blush.',
      ta: 'முழுமையான நேரடி சூரிய ஒளி தேவை.',
      tanglish: 'Daily 8-10 hours full direct sunlight thevai.',
      hours: '8 - 10 Hours Daily'
    },
    soilCare: {
      en: 'Deep, fertile, well-drained alluvial, red loam, or laterite soil with minimum 2m depth. Avoid soils with hard pan or waterlogging. pH 5.5 to 7.5.',
      ta: 'செம்மண் அல்லது மணல் கலந்த வண்டல் மண் சிறந்தது. ஆழம் குறைந்தது 2 மீட்டர் இருக்க வேண்டும். pH 5.5 முதல் 7.5.',
      tanglish: 'Deep red loam or alluvial soil with 2m depth. pH 5.5 - 7.5.',
      ph: '5.5 - 7.5',
      soilType: 'Deep Well-drained Red / Alluvial Loam'
    },
    soilTilling: {
      en: 'Dig 1 x 1 x 1 m pits at 8 x 8 m or 10 x 10 m spacing (High Density: 5 x 5 m). Expose pits to sun for a month, then fill with topsoil + 25kg FYM + 1kg Bone meal.',
      ta: '1x1x1 மீட்டர் குழிகள் எடுத்து ஒரு மாதம் வெயிலில் காயவைத்து, பின் 25 கிலோ தொழுஉரம் மற்றும் 1 கிலோ எலும்புத்தூள் கலந்து நிரப்பவும்.',
      tanglish: '1x1x1 meter pits eduthu 25kg manure mix panni plant pannunga.',
      prepStep: 'Dig 1x1x1m pits, sun dry, mix manure'
    },
    fertilizing: {
      en: 'For mature tree (10+ years): 1000g N, 500g P, 1000g K + 50kg FYM annually. Apply in circular trench 1.5m away from trunk after monsoon.',
      ta: '10 வயதுக்கு மேற்பட்ட மரத்திற்கு: தழை 1000 கிராம், மணி 500 கிராம், சாம்பல் சத்து 1000 கிராம் மற்றும் 50 கிலோ தொழுஉரத்தை மரத்தைச் சுற்றி பாத்தி எடுத்து இடவும்.',
      tanglish: 'Per mature tree NPK 1000:500:1000g + 50kg manure. Trunk-la contact aagama 1.5m thalli circular trench-la podunga.',
      npk: 'NPK 1000:500:1000 g/tree/year',
      organic: '50 kg Farmyard Manure + 2 kg Neem cake per tree'
    },
    repotting: {
      en: 'Plant epicotyl or veneer grafted saplings during monsoon (July-August). Remove grafting poly-tape after 3 months.',
      ta: 'ஒட்டுக்கன்றுகளை (Grafts) மழைக்காலத்தில் 8x8 மீட்டர் அல்லது 5x5 மீட்டர் இடைவெளியில் நடவு செய்யவும். ஒட்டு கட்டிய பிளாஸ்டிக் நாடாவை 3 மாதத்தில் நீக்கவும்.',
      tanglish: 'Grafted saplings July-August monsoon time-la plant pannunga. Grafting tape-ah remove pannidunga.',
      spacing: '8 x 8 m (Normal) / 5 x 5 m (High Density)',
      seedlingAge: 'Grafted Sapling (1 year old)'
    },
    pestControl: {
      en: 'Mango Hopper (Amritodus), Stem Borer, Fruit Fly. Spray Imidacloprid 17.8% SL @ 0.5ml/L at panicle emergence. Use Methyl Eugenol traps for fruit fly.',
      ta: 'மாந்தோட்டத் தத்துப்பூச்சி (Hopper), தண்டு துளைப்பான், பழ ஈ. பூ மொட்டு விடும் போது இமிடாக்ளோப்ரிட் 0.5 மி.லி/லிட்டர் தெளிக்கவும்.',
      tanglish: 'Mango hopper, stem borer, fruit fly. Methyl eugenol fruit fly traps veinga. Imidacloprid 0.5ml spray pannunga.',
      majorPests: ['Mango Hopper (தத்துப்பூச்சி)', 'Stem Borer (தண்டுத்துளைப்பான்)', 'Fruit Fly (பழ ஈ)'],
      remedy: 'Methyl eugenol fruit fly traps (6/acre) + Imidacloprid 0.5ml/L'
    },
    disease: {
      en: 'Anthracnose (Blossom blight / tear stains on fruit), Powdery Mildew. Spray Carbendazim 50% WP @ 1g/L or Hexaconazole 5% SC @ 2ml/L.',
      ta: 'ஆந்த்ராக்னோஸ் இலைக்கருகல் / பூக்கருகல், சாம்பல் நோய். கார்பென்டாசிம் 1 கிராம்/லிட்டர் அல்லது ஹெக்சாகோனசோல் 2 மி.லி/லிட்டர் தெளிக்கவும்.',
      tanglish: 'Anthracnose and Powdery Mildew. Carbendazim 1g or Hexaconazole 2ml spray pannunga.',
      majorDiseases: ['Anthracnose (பூக்கருகல்)', 'Powdery Mildew (சாம்பல் நோய்)', 'Sooty Mold (கரும்பூஞ்சாணம்)'],
      remedy: 'Carbendazim 1g/L or Wettable Sulphur 2g/L'
    },
    humidity: {
      en: '50% - 65%. High humidity and fog during flowering cause severe flower drop and blossom blight.',
      ta: '50% - 65% ஈரப்பதம். பூக்கும் போது பனிமூட்டம் அல்லது மழை பெய்தால் பூக்கள் உதிர்ந்துவிடும்.',
      tanglish: '50% - 65% humidity. Flowering time fog irunthaal fungal spray pannanum.',
      idealRange: '50% - 65%'
    },
    sowing: {
      en: 'Use certified authentic grafted varieties (e.g. Alphonso, Banganapalli, Neelum, Mallika, Sendhooram, Totapuri).',
      ta: 'சான்றளிக்கப்பட்ட ஒட்டு ரகங்கள் (அல்போன்சா, பங்கனப்பள்ளி, நீலம், மல்லிகா, செந்தூரம், பெங்களூரா).',
      tanglish: 'Certified grafted saplings use pannunga.',
      season: 'Jul - Sep (Monsoon planting)',
      seedRate: '60 plants/acre (Normal) or 160 plants/acre (Ultra High Density)'
    },
    pruning: {
      en: 'Prune dead, criss-cross, and diseased branches immediately after harvest (July-August) to open the tree center for maximum sunlight penetration.',
      ta: 'அறுவடை முடிந்தவுடன் ஜூலை-ஆகஸ்ட் மாதங்களில் காய்ந்த, ஒன்றுடன் ஒன்று உராய்ந்து வளரும் கிளைகளை வெட்டி மரத்தின் நடுவே சூரிய ஒளி படுமாறு செய்யவும்.',
      tanglish: 'Post-harvest (July-Aug) center pruning panni sun light inner canopy-la vizhum padi maintain pannanum.',
      whenToPrune: 'Annually after harvest (July-August)'
    },
    harvesting: {
      en: 'Harvest when fruit shoulder rises above stem attachment, skin color lightens from dark green to olive green. Harvest with 1 cm stalk using mango harvester pole.',
      ta: 'காயின் தோள்பட்டை காம்பை விட உயர்ந்து, கரும்பச்சை நிறம் லேசாக மாறும் போது காம்புடன் (1 செ.மீ) மாங்காய் பறிக்கும் கழியால் பறிக்கவும்.',
      tanglish: 'Shoulder raised aagi dark green olive green aagum pothu 1cm stem-oda mango harvester pole vechi pick pannunga.',
      maturitySigns: 'Shoulder raises above stem cavity; tap-water sinking test (1.01-1.02 specific gravity)',
      expectedYield: '4 - 8 tonnes / acre'
    }
  },
  {
    id: 'brinjal_crop',
    name: 'Brinjal / Eggplant',
    tamilName: 'கத்தரிக்காய்',
    tanglishName: 'Katharikai (Brinjal)',
    scientificName: 'Solanum melongena',
    category: 'Vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&auto=format&fit=crop&q=80',
    growthDuration: '130 - 150 Days',
    difficulty: 'Easy',
    summary: {
      en: 'Hardy warm-season vegetable crop producing continuous pickings, requiring rich compost, shoot & fruit borer protection, and regular watering.',
      ta: 'தமிழ்நாட்டில் ஆண்டு முழுவதும் பயிரிடக்கூடிய காய்கறி. தண்டு மற்றும் காய்ப்புழுவைத் தடுத்து முறையாக உரம் இட்டால் தொடர்ந்து நல்ல வருமானம் கிடைக்கும்.',
      tanglish: 'Continuous harvest tharum vegetable. Shoot & fruit borer control panna uninterrupted income kidaikkum.'
    },
    watering: {
      en: 'Irrigate every 3-4 days in summer, 6-7 days in winter. Maintain even soil moisture during flowering and fruit sizing.',
      ta: 'கோடையில் 3-4 நாட்களுக்கு ஒருமுறையும், குளிர்காலத்தில் வாரம் ஒருமுறையும் நீர் பாய்ச்சவும்.',
      tanglish: 'Summer-la 3-4 days, winter-la weekly water vidunga.',
      frequency: 'Every 3 - 5 days',
      method: 'Drip or furrow'
    },
    temperature: {
      en: 'Optimum: 22°C to 32°C. Susceptible to frost.',
      ta: 'உகந்த வெப்பநிலை: 22°C முதல் 32°C வரை.',
      tanglish: '22°C - 32°C ideal.',
      idealRange: '22°C - 32°C'
    },
    sunlight: {
      en: 'Requires full bright direct sun (6 to 8 hours daily).',
      ta: 'தினமும் 6 முதல் 8 மணி நேரம் முழு சூரிய ஒளி தேவை.',
      tanglish: 'Daily 6-8 hours direct sunshine thevai.',
      hours: '6 - 8 Hours Daily'
    },
    soilCare: {
      en: 'Rich, deep, well-drained loamy soil with plenty of organic matter. Soil pH 5.5 to 6.8.',
      ta: 'கரிசல் மண் அல்லது மணல் கலந்த வண்டல் மண் சிறந்தது. pH 5.5 முதல் 6.8.',
      tanglish: 'Well drained rich loam soil. pH 5.5 - 6.8.',
      ph: '5.5 - 6.8',
      soilType: 'Fertile Loam / Silt Loam'
    },
    soilTilling: {
      en: 'Plough field 3-4 times. Form ridges and furrows spaced 60 cm or 75 cm apart.',
      ta: 'நிலத்தை 3-4 முறை உழுது 60 செ.மீ அல்லது 75 செ.மீ இடைவெளியில் பார் அமைக்கவும்.',
      tanglish: '3-4 times plough panni 60-75cm ridges form pannanum.',
      prepStep: 'Fine tilth ridges spaced 60-75 cm'
    },
    fertilizing: {
      en: 'NPK 80:60:60 kg/acre. Apply half N and all P and K basal; top-dress remaining N in equal splits at 30, 45, and 60 days.',
      ta: 'ஏக்கருக்கு NPK 80:60:60 கிலோ. தழைச்சத்தை பிரித்து 30, 45 மற்றும் 60 நாட்களில் இடவும்.',
      tanglish: 'NPK 80:60:60 kg/acre. Split nitrogen application best.',
      npk: '80:60:60 kg/acre',
      organic: '10 tonnes Farmyard Manure + 200 kg Neem cake'
    },
    repotting: {
      en: 'Transplant 30-35 day-old seedlings at 60 x 60 cm or 75 x 60 cm spacing during evening hours.',
      ta: '30-35 நாள் வயதுடைய நாற்றுகளை மாலை வேளையில் 60x60 செ.மீ இடைவெளியில் நடவு செய்யவும்.',
      tanglish: '30-35 days seedlings-ah 60x60 cm space-la plant pannunga.',
      spacing: '60 x 60 cm (Hybrids: 75 x 60 cm)',
      seedlingAge: '30 - 35 Days'
    },
    pestControl: {
      en: 'Shoot and Fruit Borer (Leucinodes orbonalis), Little Leaf vector (Leafhopper). Clip and destroy wilted shoot tips. Spray Emamectin Benzoate 5% SG @ 0.5g/L.',
      ta: 'தண்டு மற்றும் காய்ப்புழு (Shoot & Fruit Borer). வாடிய குருத்துக்களை வெட்டி எரிக்கவும். எமாமெக்டின் பென்சோயேட் 0.5 கிராம்/லிட்டர் தெளிக்கவும்.',
      tanglish: 'Shoot & fruit borer. Wilted shoot tips cut panni erithidunga. Emamectin benzoate spray pannunga.',
      majorPests: ['Shoot & Fruit Borer (காய்ப்புழு)', 'Leafhopper (தத்துப்பூச்சி)', 'Epilachna Beetle (பொறி வண்டு)'],
      remedy: 'Clip wilted shoots weekly + Emamectin Benzoate 0.5g/L or Neem oil 5ml/L'
    },
    disease: {
      en: 'Little Leaf (Mycoplasma transmitted by leafhoppers), Bacterial Wilt, Phomopsis Blight. Spray Streptocycline @ 0.1g/L for bacterial wilt prevention.',
      ta: 'சிறிய இலை நோய் (Little leaf), பாக்டீரியா வாடல் நோய். பாதிக்கப்பட்ட செடிகளை உடனே பிடுங்கி எரிக்கவும்.',
      tanglish: 'Little leaf disease, Bacterial wilt. Roguing infected plants is mandatory.',
      majorDiseases: ['Little Leaf (சிறிய இலை நோய்)', 'Bacterial Wilt (வாடல் நோய்)', 'Phomopsis Blight'],
      remedy: 'Uproot infected Little Leaf plants + Copper Oxychloride 2.5g/L'
    },
    humidity: {
      en: '60% - 75%.',
      ta: '60% - 75% ஈரப்பதம் சிறந்தது.',
      tanglish: '60% - 75% humidity.',
      idealRange: '60% - 75%'
    },
    sowing: {
      en: 'Seed rate: 150-200g/acre for varieties, 60-80g/acre for hybrids. Sow in raised nursery beds or protrays.',
      ta: 'விதை அளவு: ஏக்கருக்கு 150-200 கிராம் (வீரிய ரகம் 60-80 கிராம்).',
      tanglish: 'Seed rate 60-80g hybrid seeds.',
      season: 'Dec - Jan, May - Jun, Sep - Oct',
      seedRate: '60 - 80 g/acre'
    },
    pruning: {
      en: 'Ratoon pruning: After first harvest cycle (at 5-6 months), cut plants back to 15-20 cm height, apply fertilizer, and irrigate to get a second harvest flush.',
      ta: 'மறுதாம்பு பயிர்: 5 மாதங்களுக்குப் பின் செடிகளை தரையிலிருந்து 15 செ.மீ உயரத்தில் வெட்டிவிட்டு உரம் இட்டு தண்ணீர் பாய்ச்சினால் மீண்டும் காய்க்கும்.',
      tanglish: '5-6 months pin 15-20cm height-la cut panni (Ratooning) fertilizer pottal 2nd harvest edukalam.',
      whenToPrune: 'After first 5-month cycle for ratoon crop'
    },
    harvesting: {
      en: 'Harvest tender, glossy, fully grown fruits before seeds harden and skin loses shine, every 4-5 days.',
      ta: 'காய்கள் பளபளப்பாக இருக்கும் போது விதை முற்றுவதற்கு முன் 4-5 நாட்களுக்கு ஒருமுறை பறிக்கவும்.',
      tanglish: 'Glossy and tender fruits-ah 4-5 days-ku oru thadava pick pannunga.',
      maturitySigns: 'Bright glossy skin, tender flesh, soft seeds',
      expectedYield: '12 - 18 tonnes / acre'
    }
  },
  {
    id: 'grape_crop',
    name: 'Grape Vine',
    tamilName: 'திராட்சை',
    tanglishName: 'Thiratchai (Grape)',
    scientificName: 'Vitis vinifera',
    category: 'Fruit',
    imageUrl: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&auto=format&fit=crop&q=80',
    growthDuration: 'Perennial Vine (120-135 days per crop cycle)',
    difficulty: 'Advanced',
    summary: {
      en: 'High-value temperate-subtropical fruit vine trained on pandal/bower trellis, requiring rigorous pruning, downy mildew prevention, and cluster thinning.',
      ta: 'பந்தல் அமைப்பில் வளர்க்கப்படும் உயர்மதிப்பு பழப் பயிர். முறையான கவாத்து மற்றும் பூஞ்சாண நோய் கட்டுப்பாடு மூலம் தரமான திராட்சைக் கொத்துக்களைப் பெறலாம்.',
      tanglish: 'Pandal trellis system vine crop. Pruning and downy mildew control panna export quality bunch kidaikkum.'
    },
    watering: {
      en: 'Drip irrigation directly at root zone (15-20 liters/vine/day during berry expansion). Stop water 10 days before harvest to build sugars.',
      ta: 'சொட்டுநீர் பாசனம் மூலம் கொடி ஒன்றுக்கு தினமும் 15-20 லிட்டர் தண்ணீர். அறுவடைக்கு 10 நாட்களுக்கு முன் தண்ணீர் நிறுத்தினால் பழம் இனிக்கும்.',
      tanglish: 'Drip irrigation 15-20 L per vine daily. Harvest-ku 10 days mun water stop panna sugar level (Brix) koodum.',
      frequency: 'Every 2-3 days via drip',
      method: 'Drip irrigation directly under canopy'
    },
    temperature: {
      en: 'Optimum: 25°C to 35°C during fruit growth; warm sunny dry climate during ripening.',
      ta: 'உகந்த வெப்பநிலை: 25°C முதல் 35°C வரை. பழுக்கும் காலத்தில் நல்ல வெயில் தேவை.',
      tanglish: '25°C - 35°C best.',
      idealRange: '25°C - 35°C'
    },
    sunlight: {
      en: 'Requires full bright direct sun (7 to 9 hours daily). Adequate sun penetration through canopy trellis is vital.',
      ta: 'தினமும் 7 முதல் 9 மணி நேரம் சூரிய ஒளி பந்தலுக்குள் படுமாறு இருக்க வேண்டும்.',
      tanglish: 'Daily 7-9 hours full sunshine thevai.',
      hours: '7 - 9 Hours Daily'
    },
    soilCare: {
      en: 'Well-drained gravelly loam, red loam, or light alluvial soil with pH 6.5 to 7.5. Avoid alkaline or waterlogged soils.',
      ta: 'வடிகால் வசதியுள்ள செம்மண் அல்லது சரளை மண் சிறந்தது. pH 6.5 முதல் 7.5 வரை.',
      tanglish: 'Gravelly loam or red soil. Waterlogged soils-la root dieback aagum.',
      ph: '6.5 - 7.5',
      soilType: 'Gravelly / Red Sandy Loam'
    },
    soilTilling: {
      en: 'Form bower/pandal trellis at 2-2.5m height. Dig trenches 60cm wide and 60cm deep filled with FYM, superphosphate, and red soil.',
      ta: '2 மீட்டர் உயரத்தில் கல் தூண் பந்தல் அமைக்கவும். 60 செ.மீ ஆழமுள்ள பாத்திகளில் எரு நிரப்பி கொடிகளை நடவும்.',
      tanglish: 'Bower pandal system ready panni 60cm trench-la manure serthu plant pannunga.',
      prepStep: 'Construct bower trellis + 60cm deep trenches'
    },
    fertilizing: {
      en: 'NPK 100:50:200 kg/acre per year. High Potassium is essential during berry sizing and veraison (color turning).',
      ta: 'ஏக்கருக்கு NPK 100:50:200 கிலோ. பழங்கள் திரளும் போது பொட்டாஷ் உரம் அதிகமாக இடவும்.',
      tanglish: 'High Potassium (SOP) spray berry expansion time-la pannanum.',
      npk: '100:50:200 kg/acre/year',
      organic: '20 tonnes FYM/acre + 500g Neem cake per vine'
    },
    repotting: {
      en: 'Plant rooted hardwood cuttings at 3 x 3 m (450 vines/acre) or 4 x 3 m spacing during Dec-Jan.',
      ta: 'வேர்விட்ட போத்துகளை 3x3 மீட்டர் இடைவெளியில் நடவு செய்யவும்.',
      tanglish: 'Rooted cuttings 3x3 meter space-la plant pannunga.',
      spacing: '3 x 3 m or 4 x 3 m',
      seedlingAge: 'Rooted Hardwood Cuttings'
    },
    pestControl: {
      en: 'Mealybugs, Thrips, Flea Beetle. Wrap sticky bands around vine trunk. Spray Imidacloprid 0.5ml/L or release Cryptolaemus predatory beetles.',
      ta: 'மாவுப்பூச்சி (Mealybug), இலைப்பேன், வண்டு. மரத்தின் தண்டைச் சுற்றி பசை பட்டை கட்டவும். கிரைப்டோலீமஸ் நன்மை செய்யும் வண்டுகளை விடலாம்.',
      tanglish: 'Mealybug, Thrips. Sticky band trunk-la kattunga. Biological control Cryptolaemus beetles release pannalam.',
      majorPests: ['Mealybug (மாவுப்பூச்சி)', 'Thrips (இலைப்பேன்)', 'Flea Beetle (வண்டு)'],
      remedy: 'Cryptolaemus predatory beetles or Buprofezin 25% SC @ 1.2ml/L'
    },
    disease: {
      en: 'Downy Mildew (Plasmopara viticola), Powdery Mildew, Anthracnose, Black Rot. Spray Bordeaux mixture 1% or Metalaxyl + Mancozeb @ 2.5g/L.',
      ta: 'அடிச்சாம்பல் நோய் (Downy mildew), சாம்பல் நோய், ஆந்த்ராக்னோஸ். 1% போர்டோ கலவை அல்லது மேன்கோசெப் 2.5 கிராம்/லிட்டர் தெளிக்கவும்.',
      tanglish: 'Downy Mildew, Powdery Mildew, Black rot. Bordeaux mixture 1% spray pannunga.',
      majorDiseases: ['Downy Mildew (அடிச்சாம்பல் நோய்)', 'Powdery Mildew', 'Black Rot (கரும்புள்ளி அழுகல்)'],
      remedy: '1% Bordeaux mixture or Azoxystrobin 1ml/L'
    },
    humidity: {
      en: '50% - 65%. High relative humidity (>80%) with leaf wetness triggers devastating Downy Mildew.',
      ta: '50% - 65% ஈரப்பதம் சிறந்தது. மழை மற்றும் ஈரப்பதம் அதிகமானால் அடிச்சாம்பல் நோய் தாக்கும்.',
      tanglish: '50% - 65% humidity. Damp leaves invite Downy mildew.',
      idealRange: '50% - 65%'
    },
    sowing: {
      en: 'Use commercial table and wine varieties (e.g. Muscat Hamburg / Panneer, Thompson Seedless, Sonaka, Bangalore Blue, Red Globe).',
      ta: 'பன்னீர் திராட்சை (Muscat Hamburg), தாம்சன் சீட்லெஸ், பெங்களூர் ப்ளூ.',
      tanglish: 'Panneer thiratchai, Thompson seedless.',
      season: 'Dec - Jan or Jun - Jul',
      seedRate: '450 - 550 vines/acre'
    },
    pruning: {
      en: 'Pruning twice yearly is compulsory: 1. Summer pruning (April) back to 1-2 buds (Foundation pruning); 2. Winter pruning (Oct) to 4-6 buds for fruit bearing.',
      ta: 'வருடத்திற்கு இருமுறை கவாத்து செய்தல் கட்டாயம்: 1. கோடை கவாத்து (ஏப்ரல்) - 1-2 மொட்டு விட்டு வெட்டுதல்; 2. குளிர் கவாத்து (அக்டோபர்) - 5-6 மொட்டு விட்டு வெட்டுதல் (பூ பூக்கும்).',
      tanglish: 'Twice yearly pruning is mandatory: Summer (April) foundation pruning, Winter (October) fruit pruning.',
      whenToPrune: 'April (Foundation pruning) & October (Fruit pruning)'
    },
    harvesting: {
      en: 'Grapes do not ripen after harvest. Harvest only when full bunches develop characteristic dark purple or golden amber color and high sugar (18-20° Brix).',
      ta: 'திராட்சை பறித்த பின் பழுக்காது. எனவே கொத்துகள் நன்கு பழுத்து இனிப்புச் சுவை வந்த பிறகே கத்திரிக்கோல் கொண்டு காம்பை வெட்டி அறுவடை செய்ய வேண்டும்.',
      tanglish: 'Grapes do not ripen off the vine. 18-20 Brix sugar level vantha pin scissor vechi bunch cut pannunga.',
      maturitySigns: 'Uniform berry color, soft touch, sweet taste (18-20° Brix)',
      expectedYield: '8 - 14 tonnes / acre / year'
    }
  },
  {
    id: 'maize_crop',
    name: 'Maize / Corn',
    tamilName: 'மக்காச்சோளம்',
    tanglishName: 'Makkacholam (Corn)',
    scientificName: 'Zea mays',
    category: 'Cereal',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=80',
    growthDuration: '95 - 115 Days',
    difficulty: 'Easy',
    summary: {
      en: 'High-yielding miracle grain crop thriving under warm sunshine, demanding high nitrogen nutrition, earthing-up, and strict Fall Armyworm protection.',
      ta: 'குறைந்த நீரில் அதிக தானியம் தரும் தானியப் பயிர். படைப்புழுவைக் கட்டுப்படுத்தி யூரியா இட்டால் அதிக மக்காச்சோள கதிர் மகசூல் பெறலாம்.',
      tanglish: 'High-yielding cereal grain. Fall armyworm control and nitrogen fertilizer panna periya corn cob kidaikkum.'
    },
    watering: {
      en: 'Irrigate every 8-10 days. Critical moisture stages: Knee-high (30-35 DAS), Tasseling (45-50 DAS), Silking (55-60 DAS), and Grain formation (65-75 DAS).',
      ta: '8-10 நாட்களுக்கு ஒருமுறை நீர் பாய்ச்சவும். பூக்கும் பருவம் மற்றும் கதிர் பால் பிடிக்கும் பருவத்தில் தண்ணீர் தட்டுப்பாடு கூடாது.',
      tanglish: 'Tasseling, silking and cob milk stages-la water stress vara koodathu.',
      frequency: 'Every 8 - 10 days',
      method: 'Furrow irrigation'
    },
    temperature: {
      en: 'Optimum: 21°C to 30°C. Temperature above 38°C during tasseling causes pollen desiccation.',
      ta: 'உகந்த வெப்பநிலை: 21°C முதல் 30°C வரை.',
      tanglish: '21°C - 30°C ideal.',
      idealRange: '21°C - 30°C'
    },
    sunlight: {
      en: 'Requires full bright direct sun (7 to 9 hours daily). Highly efficient C4 plant.',
      ta: 'தினமும் 7 முதல் 9 மணி நேரம் நேரடி சூரிய ஒளி தேவை.',
      tanglish: 'Daily 7-9 hours full sunshine thevai.',
      hours: '7 - 9 Hours Daily'
    },
    soilCare: {
      en: 'Deep, rich, well-drained loamy or red sandy loam soils rich in organic matter. pH 6.0 to 7.5. Highly sensitive to water stagnation.',
      ta: 'செம்மண் அல்லது மணல் கலந்த வண்டல் மண் சிறந்தது. தண்ணீர் தேங்கக்கூடாது. pH 6.0 முதல் 7.5.',
      tanglish: 'Deep fertile loam or red sandy loam. Water thengamal paathukonga.',
      ph: '6.0 - 7.5',
      soilType: 'Well-drained Loam / Red Soil'
    },
    soilTilling: {
      en: 'Plough field twice with mouldboard plough, form ridges and furrows spaced 60 cm apart.',
      ta: 'நிலத்தை 2 முறை உழுது 60 செ.மீ இடைவெளியில் பார் அமைக்கவும்.',
      tanglish: 'Plough twice, form 60cm ridges & furrows.',
      prepStep: 'Deep ploughing with 60cm ridges'
    },
    fertilizing: {
      en: 'NPK 100:50:50 kg/acre. Heavy feeder. Apply DAP basal, split Nitrogen in 3 doses (basal, knee-high, tasseling). Apply Zinc sulphate 10 kg/acre.',
      ta: 'ஏக்கருக்கு NPK 100:50:50 கிலோ. யூரியாவை 3 முறையாகப் பிரித்து இடவும். ஜிங்க் சல்பேட் 10 கிலோ இடவும்.',
      tanglish: 'Heavy nitrogen feeder. Urea split into 3 doses. Zinc sulphate 10kg basal-la podunga.',
      npk: '100:50:50 kg/acre',
      organic: '5 tonnes Farmyard Manure/acre'
    },
    repotting: {
      en: 'Direct seed dibbling at 60 x 20 cm or 60 x 25 cm spacing (1 seed per hill at 3-4 cm depth).',
      ta: '60x20 செ.மீ இடைவெளியில் 4 செ.மீ ஆழத்தில் விதைகளை ஊன்றவும்.',
      tanglish: '60x20 cm space-la 3-4cm aazhathula seed sow pannunga.',
      spacing: '60 x 20 cm or 60 x 25 cm',
      seedlingAge: 'Direct Seed Sown'
    },
    pestControl: {
      en: 'Fall Armyworm (Spodoptera frugiperda), Stem Borer. Apply Emamectin Benzoate 5% SG @ 0.4g/L or Spinetoram 11.7% SC @ 0.5ml/L directly into plant whorls.',
      ta: 'படைப்புழு (Fall Armyworm), தண்டுத்துளைப்பான். செடியின் குருத்தில் படுமாறு எமாமெக்டின் பென்சோயேட் 0.4 கிராம்/லிட்டர் அல்லது ஸ்பைனடோரம் தெளிக்கவும்.',
      tanglish: 'Fall Armyworm kuruthu puzhu. Plant whorl-la Emamectin Benzoate 0.4g/L spray panna control aagum.',
      majorPests: ['Fall Armyworm (படைப்புழு)', 'Stem Borer (தண்டுத்துளைப்பான்)'],
      remedy: 'Apply Emamectin Benzoate 0.4g/L or Chlorantraniliprole into leaf whorls'
    },
    disease: {
      en: 'Turcicum Leaf Blight, Maydis Leaf Blight, Rust. Spray Mancozeb 75% WP @ 2g/L or Azoxystrobin @ 1ml/L.',
      ta: 'இலைக்கருகல் நோய், துரு நோய். மேன்கோசெப் 2 கிராம்/லிட்டர் தெளிக்கவும்.',
      tanglish: 'Turcicum leaf blight. Mancozeb 2g per litre spray pannunga.',
      majorDiseases: ['Turcicum Leaf Blight (இலைக்கருகல்)', 'Common Rust (துரு நோய்)'],
      remedy: 'Mancozeb 2g/L or Propiconazole 1ml/L'
    },
    humidity: {
      en: '55% - 75%.',
      ta: '55% - 75% ஈரப்பதம் சிறந்தது.',
      tanglish: '55% - 75% humidity.',
      idealRange: '55% - 75%'
    },
    sowing: {
      en: 'Seed rate: 6-8 kg/acre for hybrids. Treat seeds with Cyantraniliprole 19.8% + Thiamethoxam 19.8% FS @ 4ml/kg against Fall Armyworm.',
      ta: 'விதை அளவு: ஏக்கருக்கு 6-8 கிலோ. விதைநேர்த்தி செய்து விதைக்கவும்.',
      tanglish: 'Seed rate 6-8 kg hybrid seed per acre. Seed treatment panna initial armyworm attack thadukkalam.',
      season: 'Adipattam (Jul - Aug), Thaipattam (Jan - Feb)',
      seedRate: '6 - 8 kg/acre'
    },
    pruning: {
      en: 'Earthing-up: Earth-up soil around plant base at 30-35 days after sowing to give support against lodging and bury weeds.',
      ta: 'மண் அணைத்தல்: விதைத்த 30-35 ஆம் நாளில் செடியைச் சுற்றி மண் அணைத்து மேட்டுப் பாத்தி அமைக்கவும். இதனால் செடி காற்றில் சாயாது.',
      tanglish: '30-35 days-la mann anaithal compulsory. Plant breeze-la lodging aagama support kidaikkum.',
      whenToPrune: 'Earthing-up at 30-35 DAS'
    },
    harvesting: {
      en: 'For green sweet corn cobs: Harvest at milk/dough stage when silks turn dark brown. For dry grain: Harvest when husk leaves turn straw yellow and paper dry.',
      ta: 'பச்சை மக்காச்சோளத்திற்கு பூஞ்சூழ்முடி பழுப்பு நிறமாக மாறும் போதும், தானியத்திற்கு சோளத்தட்டை காய்ந்து சருகாகும் போதும் அறுவடை செய்யவும்.',
      tanglish: 'Green cob milk stage-la harvest pannalam. Grain-ku cob cover paper maathiri dry aana pin harvest pannunga.',
      maturitySigns: 'Husk turns straw yellow, dry silks, black layer forms at base of grain',
      expectedYield: '2.5 - 3.5 tonnes dry grain / acre'
    }
  },
  {
    id: 'coconut_crop',
    name: 'Coconut',
    tamilName: 'தென்னை',
    tanglishName: 'Thennai (Coconut)',
    scientificName: 'Cocos nucifera',
    category: 'Cash Crop',
    imageUrl: 'https://images.unsplash.com/photo-1544986581-efac024faf62?w=800&auto=format&fit=crop&q=80',
    growthDuration: 'Perennial (5-6 yrs to first yield, 60+ yrs life)',
    difficulty: 'Easy',
    summary: {
      en: 'The tree of life (Kalpavriksha). Requires full tropical sunshine, deep well-drained sandy loam or red soil, and regular irrigation (40-50L/day/tree in drip).',
      ta: 'கற்பகவிருட்சம் எனப்படும் தென்னை மரம். நல்ல வடிகால் வசதியுள்ள மண், போதுமான பாசனம், பொட்டாஷ் உரம் மற்றும் காண்டாமிருக வண்டு மேலாண்மை மூலம் அதிக தேங்காய் மகசூல் பெறலாம்.',
      tanglish: 'Thennai maram perennial crop. Drip irrigation-la daily 40-50L water and Potash uram pottal continuous coconut harvest kidaikkum.'
    },
    watering: {
      en: 'Bearing palm requires 40 to 50 litres of water daily through drip irrigation or 200L once every 4-5 days in basin irrigation. Avoid water stagnation.',
      ta: 'காய்க்கும் மரத்திற்கு சொட்டுநீர்ப் பாசனம் மூலம் தினமும் 40-50 லிட்டர் தண்ணீர் அல்லது பாத்தி மூலம் 4-5 நாட்களுக்கு ஒருமுறை 200 லிட்டர் தண்ணீர் பாய்ச்ச வேண்டும்.',
      tanglish: 'Drip irrigation-la daily 40-50 litres or basin method-la 4-5 days-ku orumurai 200L water tharanum.',
      frequency: 'Daily via drip or every 4-5 days via basin',
      method: 'Drip irrigation / circular basin (1.8m radius)'
    },
    temperature: {
      en: 'Optimal range: 27°C to 35°C. Prefers warm tropical humid coastal and inland plains.',
      ta: 'உகந்த வெப்பநிலை: 27°C முதல் 35°C வரை. மிதமான வெப்பமும் ஈரப்பதமும் தேவை.',
      tanglish: '27°C - 35°C ideal.',
      idealRange: '27°C - 35°C'
    },
    sunlight: {
      en: 'Demands full direct bright sunlight (8+ hours daily). Shading causes tall, weak trunks and poor nut setting.',
      ta: 'முழு சூரிய ஒளி தேவை (தினமும் 8 மணி நேரத்திற்கு மேல்). நிழல் இருந்தால் குலை தள்ளுவது குறையும்.',
      tanglish: 'Daily 8+ hours full bright sunshine compulsory.',
      hours: '8+ Hours Daily'
    },
    soilCare: {
      en: 'Red sandy loam, alluvial, and coastal sandy soils with minimum 1.5m soil depth. pH 5.2 to 8.0. Incorporate green manure in basin.',
      ta: 'செம்மண், வண்டல் மண் அல்லது மணற்பாங்கான மண் சிறந்தது. குறைந்தபட்சம் 1.5 மீட்டர் மண் ஆழம் மற்றும் நல்ல வடிகால் தேவை.',
      tanglish: 'Deep red sandy loam or alluvial soil. Drainage mukkiyam.',
      ph: '5.2 - 8.0',
      soilType: 'Deep Sandy Loam / Red Soil'
    },
    soilTilling: {
      en: 'Dig planting pit of 1m x 1m x 1m size. Fill lower 60cm with topsoil, FYM 25kg, red earth, and 1kg Bone meal/Neem cake.',
      ta: '1x1x1 மீட்டர் ஆழமுள்ள குழி எடுத்து, மேல்மண், 25 கிலோ தொழு உரம், 1 கிலோ வேப்பம்பிண்ணாக்கு சேர்த்து நிரப்பவும்.',
      tanglish: '1x1x1 meter pit eduthu FYM and neem cake mix panni nattal ver nalla pidikkum.',
      prepStep: '1m x 1m x 1m Pit preparation with FYM and topsoil'
    },
    fertilizing: {
      en: 'Per bearing tree/year: 1.3 kg Urea, 2.0 kg Superphosphate, 2.0 kg Muriate of Potash (MOP) in 2 splits (May-June and Sept-Oct). Apply 50kg FYM + 2kg TNAU Coconut Micronutrient.',
      ta: 'ஒரு மரத்திற்கு ஆண்டுக்கு: யூரியா 1.3 கிலோ, சூப்பர்பாஸ்பேட் 2 கிலோ, பொட்டாஷ் 2 கிலோ ஆகியவற்றை இரு தவணைகளாக இடவும். 50 கிலோ தொழு உரம் + 2 கிலோ தென்னை நுண்ணூட்டம் இடவும்.',
      tanglish: 'Oru marathukku yearly: Urea 1.3kg, Superphosphate 2kg, Potash 2kg rendu split-la podanum.',
      npk: '1.3kg Urea + 2kg Superphosphate + 2kg Potash / tree / year',
      organic: '50 kg Farmyard Manure + 5 kg Neem Cake + Sunnhemp green manure'
    },
    repotting: {
      en: 'Plant 9-12 month-old vigorous seedlings with minimum 6 leaves and 10cm collar girth at 7.5m x 7.5m spacing (70 trees/acre).',
      ta: '9-12 மாத வயதுடைய தரமான நாற்றுகளை 7.5 x 7.5 மீட்டர் (25x25 அடி) இடைவெளியில் நடவு செய்யவும்.',
      tanglish: '9-12 month old seedlings 25x25 feet gap-la plant pannunga.',
      spacing: '7.5m x 7.5m (25 x 25 feet)',
      seedlingAge: '9 - 12 Months'
    },
    pestControl: {
      en: 'Rhinoceros Beetle, Red Palm Weevil, Coconut Black-headed Caterpillar. Place pheromone traps, hook out beetles, apply Phorate 10G or Metarhizium anisopliae.',
      ta: 'காண்டாமிருக வண்டு, சிவப்பு கூன்வண்டு, கருந்தலைப் புழு. கட்டுப்படுத்த இனக்கவர்ச்சிப் பொறி வைக்கவும், வேப்பங்கொட்டை தூள் + மணல் கலந்து குருத்தில் வைக்கவும்.',
      tanglish: 'Rhinoceros beetle and red palm weevil. Pheromone trap and Neem cake sand mixture kuruthula vainga.',
      majorPests: ['Rhinoceros Beetle (காண்டாமிருக வண்டு)', 'Red Palm Weevil (சிவப்பு கூன்வண்டு)', 'Eriophyid Mite'],
      remedy: 'Pheromone trap + Hook out beetle + Apply 1:1 sand and neem cake in crown'
    },
    disease: {
      en: 'Thanjavur Wilt (Ganoderma), Bud Rot, Stem Bleeding. Root feed with Hexaconazole 2% @ 13.5ml in 100ml water or drench with Bordeaux mixture 1%.',
      ta: 'தஞ்சாவூர் வாடல் நோய் (கானோடெர்மா), குருத்தழுகல், தண்டுவடிதல் நோய். ஹெக்சாகோனசோல் 13.5 மி.லி + 100 மி.லி தண்ணீர் வேர் வழியாகச் செலுத்தவும்.',
      tanglish: 'Thanjavur Vaadal Noi, Kuruthalukal. Hexaconazole root feeding and Bordeaux mixture spray.',
      majorDiseases: ['Thanjavur Wilt (தஞ்சாவூர் வாடல்)', 'Bud Rot (குருத்தழுகல்)', 'Stem Bleeding'],
      remedy: 'Root feeding with Hexaconazole 13.5ml in 100ml water + 5kg Neem cake/tree'
    },
    humidity: {
      en: '60% - 85% relative humidity.',
      ta: '60% முதல் 85% ஈரப்பதம்.',
      tanglish: '60% - 85% humid conditions.',
      idealRange: '60% - 85%'
    },
    sowing: {
      en: 'Select seed nuts from 25-30 year old high-yielding mother palms (minimum 100 nuts/year). Plant in nursery raised beds.',
      ta: 'ஆண்டுக்கு 100-க்கும் மேற்பட்ட காய்கள் காய்க்கும் 25-30 வயதுள்ள தாய் மரங்களிலிருந்து விதைத் தேங்காய்களைத் தேர்ந்தெடுக்கவும்.',
      tanglish: 'Nalla yield tharum 25-30 years mother tree-la irunthu seed coconut edunga.',
      season: 'June - December (Monsoon)',
      seedRate: '70 Seedlings / acre'
    },
    pruning: {
      en: 'Clean crown (பாளை வெட்டுதல்) 2-3 times a year. Remove only completely dry, dead brown fronds. Do not cut green healthy fronds.',
      ta: 'ஆண்டுக்கு 2-3 முறை குருத்துச் சுத்தம் செய்யவும். காய்ந்த மட்டைகளை மட்டும் அகற்றவும். பச்சையான மட்டைகளை வெட்டக்கூடாது.',
      tanglish: 'Dry fronds mattum remove pannunga. Pachai mattai cut panna koodathu.',
      whenToPrune: 'Clean crown during harvest rounds (every 45 days)'
    },
    harvesting: {
      en: 'Harvest fully mature 11-12 month-old nuts every 45-60 days. Nuts should produce a clear metallic hollow ringing sound when tapped.',
      ta: '45 முதல் 60 நாட்களுக்கு ஒருமுறை 11-12 மாதங்கள் முதிர்ந்த தேங்காய்களை அறுவடை செய்யவும். தட்டும்போது தெளிவான கணீர் சத்தம் கேட்க வேண்டும்.',
      tanglish: 'Every 45-60 days mature coconut harvest pannalam. Thattum pothu bell sound varanum.',
      maturitySigns: 'Outer husk turns brownish green, water sound inside, metallic tap sound',
      expectedYield: '80 - 140 nuts / tree / year'
    }
  },
  {
    id: 'turmeric_crop',
    name: 'Turmeric',
    tamilName: 'மஞ்சள்',
    tanglishName: 'Manjal (Turmeric)',
    scientificName: 'Curcuma longa',
    category: 'Spice',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
    growthDuration: '240 - 270 Days (8-9 Months)',
    difficulty: 'Moderate',
    summary: {
      en: 'Golden spice of Tamil Nadu (Erode / Salem). Demands rich humus soil, bed mulching, balanced potash, and strict Rhizome Rot management.',
      ta: 'ஈரோடு, சேலம் மாவட்டங்களின் தங்கப் பயிர். நல்ல வடிகால் வசதியுள்ள மண், இலை தழை மூடாக்கு, கிழங்கு அழுகல் நோய் தடுப்பு மூலம் அதிக மஞ்சள் கிழங்கு மகசூல் பெறலாம்.',
      tanglish: 'Erode golden spice. Ridge and furrow, leaf mulching, and rhizome rot control mukkiyam.'
    },
    watering: {
      en: 'Irrigate once every 7-10 days depending on soil moisture. Ensure excellent drainage; standing water leads to devastating Rhizome Rot.',
      ta: '7-10 நாட்களுக்கு ஒருமுறை பாசனம் செய்யவும். பாத்திகளில் தண்ணீர் தேங்காமல் வடித்துவிட வேண்டும்.',
      tanglish: '7-10 days once irrigation. Water thenga koodathu.',
      frequency: 'Every 7 - 10 days',
      method: 'Ridge and furrow / Drip with inline emitters'
    },
    temperature: {
      en: '20°C to 35°C. Warm and humid climate.',
      ta: '20°C முதல் 35°C வரை.',
      tanglish: '20°C - 35°C ideal.',
      idealRange: '20°C - 35°C'
    },
    sunlight: {
      en: 'Thrives in open sunlight (6-8 hours), also grows well under light partial shade as an intercrop in coconut/banana orchards.',
      ta: '6-8 மணி நேரம் சூரிய ஒளி தேவை. தென்னை, பாக்கு தோப்புகளில் ஊடுபயிராகவும் சாகுபடி செய்யலாம்.',
      tanglish: '6-8 hours sun. Coconut thoppu-la intercrop-aaga nalla varum.',
      hours: '6 - 8 Hours Daily'
    },
    soilCare: {
      en: 'Well-drained rich loamy or alluvial soil rich in organic matter. pH 6.0 to 7.5. Avoid heavy sticky clay.',
      ta: 'மணல் கலந்த செம்மண் அல்லது வண்டல் மண் சிறந்தது. pH 6.0 முதல் 7.5.',
      tanglish: 'Well-drained loam or alluvial soil.',
      ph: '6.0 - 7.5',
      soilType: 'Sandy Loam / Alluvial'
    },
    soilTilling: {
      en: 'Plough field 4 times to fine tilth. Form ridges and furrows at 45cm or raised beds of 120cm width.',
      ta: 'நிலத்தை 4 முறை உழுது புழுதியாக்கவும். 45 செ.மீ இடைவெளியில் பார் அமைக்கவும் அல்லது மேட்டுப்பாத்தி அமைக்கவும்.',
      tanglish: 'Plough 4 times, form 45cm ridges or raised beds.',
      prepStep: '4 deep ploughings, form ridges at 45 cm'
    },
    fertilizing: {
      en: 'NPK 100:25:75 kg/acre. Apply full P basal, split N and K in 3 doses (30, 60, and 90 DAS). Apply Micronutrient mixture 5 kg/acre.',
      ta: 'ஏக்கருக்கு NPK 100:25:75 கிலோ. பொட்டாஷ் மற்றும் தழைச்சத்தை 30, 60, 90 வது நாட்களில் பிரித்து இடவும்.',
      tanglish: 'NPK 100:25:75 kg/acre. Potash rhizome perusaga help pannum.',
      npk: '100:25:75 kg/acre',
      organic: '10 tonnes FYM + 1 tonne Neem Cake + Trichoderma viride'
    },
    repotting: {
      en: 'Plant mother/finger rhizomes at 45 x 15 cm spacing at a depth of 4 cm. Mulch immediately with green leaves @ 5 tonnes/acre.',
      ta: '45 x 15 செ.மீ இடைவெளியில் 4 செ.மீ ஆழத்தில் விதைக்கிழங்குகளை நடவு செய்து உடனே பசுந்தழை மூடாக்கு இடவும்.',
      tanglish: '45x15 cm spacing-la seed rhizome plant pannunga.',
      spacing: '45 x 15 cm',
      seedlingAge: 'Rhizome Seed Piece'
    },
    pestControl: {
      en: 'Shoot Borer, Rhizome Scale, Thrips. Spray Dimethoate 30% EC @ 1.5ml/L or Neem oil 3ml/L.',
      ta: 'தண்டுத்துளைப்பான் புழு, செதில் பூச்சி, இலைப்பேன். டைமெத்தோயேட் 1.5 மி.லி/லிட்டர் அல்லது வேப்பெண்ணெய் தெளிக்கவும்.',
      tanglish: 'Thanduthulaipaan puzhu. Dimethoate or neem spray pannunga.',
      majorPests: ['Shoot Borer (தண்டுத்துளைப்பான்)', 'Rhizome Scale (செதில் பூச்சி)', 'Thrips'],
      remedy: 'Spray Dimethoate 1.5ml/L or Neem oil 3%'
    },
    disease: {
      en: 'Rhizome Rot (Pythium / Fusarium), Leaf Spot (Colletotrichum), Leaf Blotch. Drench soil with Copper Oxychloride 2.5g/L or Metalaxyl + Mancozeb 2g/L.',
      ta: 'கிழங்கு அழுகல் நோய், இலைப்புள்ளி நோய். காப்பர் ஆக்ஸிகுளோரைடு 2.5 கிராம்/லிட்டர் அல்லது மெட்டலாக்சில் மருந்தை பாத்தி நனைய ஊற்றவும்.',
      tanglish: 'Kizhangu Azhukal Noi. Copper Oxychloride 2.5g/L drenching compulsory.',
      majorDiseases: ['Rhizome Rot (கிழங்கு அழுகல்)', 'Leaf Spot (இலைப்புள்ளி)', 'Leaf Blotch'],
      remedy: 'Treat seed rhizome with Ridomil Gold @ 2g/L and drench soil'
    },
    humidity: {
      en: '70% - 90% relative humidity.',
      ta: '70% முதல் 90% வரை.',
      tanglish: '70% - 90% humid.',
      idealRange: '70% - 90%'
    },
    sowing: {
      en: 'Seed rate: 1000 kg finger rhizomes or 800 kg mother rhizomes per acre. Treat with Mancozeb @ 3g/L for 30 minutes before planting.',
      ta: 'விதை அளவு: ஏக்கருக்கு 1000 கிலோ விரலி மஞ்சள் அல்லது 800 கிலோ தாய் மஞ்சள். மேன்கோசெப் கரைசலில் 30 நிமிடம் ஊறவைத்து நடவும்.',
      tanglish: 'Seed rate 800-1000 kg rhizomes/acre. Seed treatment with fungicide.',
      season: 'May - June (Vaigasi / Aani)',
      seedRate: '800 - 1000 kg rhizomes/acre'
    },
    pruning: {
      en: 'Weeding & Earthing-up at 60 and 90 days after planting. Renew leaf mulch twice during active growth.',
      ta: 'நடவு செய்த 60 மற்றும் 90-வது நாட்களில் களையெடுத்து மண் அணைக்கவும். மூடாக்கை புதுப்பிக்கவும்.',
      tanglish: '60 and 90 days-la mann anaithal and leaf mulching pannanum.',
      whenToPrune: 'Earthing-up at 60 & 90 DAS'
    },
    harvesting: {
      en: 'Harvest when leaves turn yellow, wither, and completely dry up to ground level (8-9 months). Dig carefully without injuring rhizomes.',
      ta: 'மஞ்சள் இலைகள் முற்றிலும் மஞ்சள் நிறமாகி காய்ந்து தரையில் விழும்போது அறுவடை செய்யவும். கிழங்கில் காயம் படாமல் தோண்ட வேண்டும்.',
      tanglish: 'Leaves fulla manjal aagi dry aana pin kizhangu damage aagama dig panni edukavum.',
      maturitySigns: 'Complete yellowing and drying of foliage, firm rhizome skin',
      expectedYield: '8 - 12 tonnes fresh rhizomes / acre'
    }
  },
  {
    id: 'sugarcane_crop',
    name: 'Sugarcane',
    tamilName: 'கரும்பு',
    tanglishName: 'Karumbu (Sugarcane)',
    scientificName: 'Saccharum officinarum',
    category: 'Cash Crop',
    imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&auto=format&fit=crop&q=80',
    growthDuration: '300 - 360 Days (10-12 Months)',
    difficulty: 'Moderate',
    summary: {
      en: 'Major cash crop providing sugar and jaggery. Demands heavy irrigation, high solar radiation, deep trenching, earthing-up, and Red Rot prevention.',
      ta: 'தமிழ்நாட்டின் முக்கிய பணப்பயிர். சீரான பாசனம், மண் அணைத்தல், தோகை உரித்தல் மற்றும் செவ்வழுகல் நோய் தடுப்பு மூலம் 50+ டன் கரும்பு மகசூல் பெறலாம்.',
      tanglish: 'Major cash crop. Good water management, earthing up, detrasher, and red rot control mukkiyam.'
    },
    watering: {
      en: 'Irrigate once every 7 days during tillering (germination to 120 days) and every 10-12 days during grand growth. Critical need is 1500-2000 mm water.',
      ta: 'பயிர் வளர்ச்சிப் பருவத்தில் 7-10 நாட்களுக்கு ஒருமுறை பாசனம் செய்யவும். கரும்பு முதிர்ச்சிப் பருவத்தில் அறுவடைக்கு 15 நாட்களுக்கு முன் நீரை நிறுத்தவும்.',
      tanglish: '7-10 days once irrigation. Harvest-ku 15 days mun water stop pannanum.',
      frequency: 'Every 7 - 10 days',
      method: 'Furrow irrigation / Drip irrigation'
    },
    temperature: {
      en: '25°C to 38°C. Warm tropical weather ensures high sugar synthesis and elongation.',
      ta: '25°C முதல் 38°C வரை. நல்ல வெப்பம் கரும்பு தடிமனாக வளர உதவும்.',
      tanglish: '25°C - 38°C ideal.',
      idealRange: '25°C - 38°C'
    },
    sunlight: {
      en: 'Demands intense direct sunlight (8-10 hours daily). Solar radiation directly governs sucrose accumulation.',
      ta: 'தினமும் 8-10 மணி நேரம் நேரடி சூரிய ஒளி தேவை. சூரிய ஒளி அதிகமாக இருந்தால் சர்க்கரை சத்து கூடும்.',
      tanglish: '8-10 hours full sunshine daily.',
      hours: '8 - 10 Hours Daily'
    },
    soilCare: {
      en: 'Deep, rich, well-drained loams and heavy clay loams with minimum 1m depth. pH 6.5 to 8.0.',
      ta: 'நல்ல ஆழமான வண்டல் மண், செம்மண் அல்லது கரிசல் மண் உகந்தது. கார அமிலத்தன்மை 6.5 முதல் 8.0.',
      tanglish: 'Deep fertile loam or black soil. Drainage nalla irukkanum.',
      ph: '6.5 - 8.0',
      soilType: 'Clay Loam / Alluvial Loam'
    },
    soilTilling: {
      en: 'Deep subsoiling and ploughing 3 times with disc plough. Form deep trenches / furrows spaced 90 cm to 120 cm apart.',
      ta: 'நிலத்தை 3 முறை ஆழ உழவு செய்து 90 செ.மீ அல்லது 120 செ.மீ இடைவெளியில் ஆழமான பார்களை அமைக்கவும்.',
      tanglish: 'Plough deeply, form furrows at 90-120cm spacing.',
      prepStep: 'Deep ploughing with 90-120cm furrows'
    },
    fertilizing: {
      en: 'NPK 112:25:45 kg/acre. Apply full P basal in furrow, split N and K at 30, 60, and 90 days. Top dress with Azospirillum @ 2 kg/acre.',
      ta: 'ஏக்கருக்கு NPK 112:25:45 கிலோ. தழை மற்றும் சாம்பல் சத்தை 30, 60, 90-வது நாட்களில் பிரித்து இடவும்.',
      tanglish: 'NPK 112:25:45 kg/acre. 30, 60, 90 days-la split-ah podunga.',
      npk: '112:25:45 kg/acre',
      organic: '10 tonnes Pressmud / FYM + 2 kg Gluconacetobacter'
    },
    repotting: {
      en: 'Plant two-budded setts (30,000 setts/acre) or single-bud chip seedlings (5,000 seedlings/acre in Sustainable Sugarcane Initiative SSI).',
      ta: 'இருபரு கரணைகளை ஏக்கருக்கு 30,000 வீதம் அல்லது ஒருபரு நாற்றுகளை (SSI முறை) 5x2 அடி இடைவெளியில் நடவு செய்யவும்.',
      tanglish: 'Two-bud setts or single bud SSI seedlings planting.',
      spacing: '90 x 30 cm or 150 x 60 cm (SSI Method)',
      seedlingAge: 'Setts / 25-30 Days Nursery Seedling'
    },
    pestControl: {
      en: 'Early Shoot Borer, Internode Borer, Top Shoot Borer, White Grub. Release Trichogramma egg parasitoids @ 2cc/acre, apply Chlorantraniliprole 0.4% G.',
      ta: 'இடைக்கணு புழு, குருத்துப் புழு, வெள்ளை வேர்ப்புழு. டிரைக்கோடெர்மா ஒட்டுண்ணி அட்டை கட்டவும், குளோரான்ட்ரானிலிப்ரோல் குறுணை இடவும்.',
      tanglish: 'Shoot borer and internode borer. Trichogramma cards and Chlorantraniliprole granule.',
      majorPests: ['Early Shoot Borer (குருத்துப் புழு)', 'Internode Borer (இடைக்கணு புழு)', 'Whitefly'],
      remedy: 'Release Trichogramma egg parasite + Apply Chlorantraniliprole 18.5% SC @ 150ml/acre'
    },
    disease: {
      en: 'Red Rot (Colletotrichum falcatum), Smut, Grassy Shoot Disease. Use certified disease-free setts, dip setts in Carbendazim 1g/L at planting.',
      ta: 'செவ்வழுகல் நோய் (Red Rot), கானல் நோய் (Smut), புல் தண்டு நோய். கார்பென்டாசிம் மருந்தில் கரணைகளை நனைத்து நடவு செய்யவும்.',
      tanglish: 'Red rot noi. Sett treatment with Carbendazim 1g/L and resistant variety choose pannanum.',
      majorDiseases: ['Red Rot (செவ்வழுகல்)', 'Smut (கானல் நோய்)', 'Grassy Shoot'],
      remedy: 'Sett treatment with Carbendazim 50% WP @ 1g/L + Hot water treatment'
    },
    humidity: {
      en: '60% - 85% relative humidity.',
      ta: '60% முதல் 85% ஈரப்பதம்.',
      tanglish: '60% - 85% humidity.',
      idealRange: '60% - 85%'
    },
    sowing: {
      en: 'Select top 1/3 portion of mature 8-10 month cane for highest bud viability. Dip setts in fungicide solution.',
      ta: '8-10 மாத வயதுள்ள கரும்பின் மேற்பகுதி கரணைகளைத் தேர்ந்தெடுக்கவும்.',
      tanglish: 'Top 1/3 portion of cane setts-ah seed-ku select pannunga.',
      season: 'Special (Feb - Mar), Early (Dec - Jan), Mid (Feb - Mar)',
      seedRate: '30,000 two-budded setts / acre'
    },
    pruning: {
      en: 'De-trashing: Remove lower dry leaves at 5th and 7th month to improve aeration, discourage pests, and reduce rat damage. Propping (binding canes together) prevents wind lodging.',
      ta: 'தோகை உரித்தல்: 5 மற்றும் 7-வது மாதத்தில் காய்ந்த தோகைகளை உரிக்கவும். விட்டம் கட்டுதல் (Propping) மூலம் கரும்பு காற்றில் சாயாமல் காக்கவும்.',
      tanglish: '5 and 7 months-la detrashing pannanum, propping panna wind lodging aagadhu.',
      whenToPrune: 'Detrash at 150 and 210 DAS, propping at 210 DAS'
    },
    harvesting: {
      en: 'Harvest when brix reading reaches 18-20% and top buds show swelling. Cut flush with ground level with sharp cane knife; maximum sugar is in bottom internodes.',
      ta: '10-12 மாதங்களில் தரைமட்டத்திற்கு வெட்டி அறுவடை செய்யவும். கரும்பின் அடிப்பகுதியில் அதிக சர்க்கரை சத்து உள்ளதால் தரைமட்டத்திற்கு வெட்டுவது அவசியம்.',
      tanglish: 'Brix 18-20% varum pothu tharaimattathirku cut panni harvest pannanum.',
      maturitySigns: 'Leaves turn yellowish, metallic clinking sound, brix refractometer 18-20%',
      expectedYield: '45 - 65 tonnes / acre'
    }
  },
  {
    id: 'groundnut_crop',
    name: 'Groundnut / Peanut',
    tamilName: 'நிலக்கடலை / வேர்க்கடலை',
    tanglishName: 'Nilakkadalai (Groundnut)',
    scientificName: 'Arachis hypogaea',
    category: 'Cash Crop',
    imageUrl: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=800&auto=format&fit=crop&q=80',
    growthDuration: '105 - 120 Days',
    difficulty: 'Easy',
    summary: {
      en: 'Vital oilseed crop. Needs friable sandy loam for easy peg penetration, gypsum application at 40-45 DAS for pod filling, and Tikka Leaf Spot control.',
      ta: 'முக்கிய எண்ணெய் வித்து பயிர். விழுதுகள் எளிதில் இறங்க மணல் கலந்த செம்மண், காய் பிடிக்கும் பருவத்தில் ஜிப்சம் இடுதல் மற்றும் டிக்கா இலைப்புள்ளி மேலாண்மை அவசியம்.',
      tanglish: 'Oilseed crop. Sandy loam soil, 40-45 days-la Gypsum poduradhu pod filling-ku romba mukkiyam.'
    },
    watering: {
      en: 'Irrigate immediately after sowing, life irrigation on 4th day. Critical stages: Flowering (25-30 DAS) and Pegging / Pod formation (40-65 DAS). Do not disturb soil during pegging.',
      ta: 'விதைத்தவுடன் ஒரு தண்ணீர், 4-ம் நாள் உயிர் தண்ணீர். பூக்கும் பருவம் மற்றும் விழுது இறங்கும் பருவத்தில் நீர் தட்டுப்பாடு கூடாது.',
      tanglish: 'Sowing and 4th day life irrigation. Flowering and pegging stage-la water stress vara koodathu.',
      frequency: 'Every 8 - 10 days',
      method: 'Check basin / Sprinkler irrigation'
    },
    temperature: {
      en: '22°C to 32°C. High temperature above 35°C during flowering causes flower drop.',
      ta: 'உகந்த வெப்பநிலை: 22°C முதல் 32°C வரை.',
      tanglish: '22°C - 32°C ideal.',
      idealRange: '22°C - 32°C'
    },
    sunlight: {
      en: 'Requires full bright direct sun (7 to 8 hours daily).',
      ta: 'தினமும் 7-8 மணி நேரம் சூரிய ஒளி தேவை.',
      tanglish: '7-8 hours direct sunlight.',
      hours: '7 - 8 Hours Daily'
    },
    soilCare: {
      en: 'Well-drained light-textured sandy loam or red loam soils rich in calcium and organic matter. pH 6.0 to 7.5. Avoid heavy sticky clay which prevents peg entry.',
      ta: 'மணல் கலந்த செம்மண் சிறந்தது. விழுதுகள் மண்ணிற்குள் எளிதில் இறங்க மண் இலகுவாக இருக்க வேண்டும்.',
      tanglish: 'Loose sandy loam soil. Pegs easily enter aagum.',
      ph: '6.0 - 7.5',
      soilType: 'Light Sandy Loam / Red Soil'
    },
    soilTilling: {
      en: 'Plough field 3 times with cultivator to create a fine, loose seedbed for unhindered peg entry. Form broad beds and furrows (BBF).',
      ta: 'நிலத்தை 3 முறை உழுது புழுதியாக்கி கட்டிகள் இல்லாமல் சமன்படுத்தவும்.',
      tanglish: 'Plough 3 times to get fine loose tilth.',
      prepStep: 'Fine tilth with Broad Bed Furrows'
    },
    fertilizing: {
      en: 'NPK 10:20:30 kg/acre. Crucial: Apply Gypsum @ 160 kg/acre at 40-45 days (flowering to pegging) and hoe gently. Gypsum provides Calcium for shell formation and Sulphur for oil synthesis.',
      ta: 'ஏக்கருக்கு NPK 10:20:30 கிலோ. முக்கியமாக, 40-45 ஆம் நாளில் ஏக்கருக்கு 160 கிலோ ஜிப்சம் இட்டு மண் அணைக்கவும். ஜிப்சம் பருப்பு திரட்சியாக உதவும்.',
      tanglish: 'NPK 10:20:30 kg/acre. 40-45 days-la Gypsum 160 kg/acre mandatory for full peanut pod.',
      npk: '10:20:30 kg/acre + 160 kg Gypsum/acre',
      organic: '5 tonnes FYM + Rhizobium @ 1 kg/acre seed treat'
    },
    repotting: {
      en: 'Direct seeding at 30 x 10 cm spacing at 4 cm depth.',
      ta: '30 x 10 செ.மீ இடைவெளியில் 4 செ.மீ ஆழத்தில் விதைகளை ஊன்றவும்.',
      tanglish: '30x10 cm spacing-la seed sow pannunga.',
      spacing: '30 x 10 cm',
      seedlingAge: 'Direct Seed Sown'
    },
    pestControl: {
      en: 'Red Hairy Caterpillar, Spodoptera litura (Tobacco caterpillar), Leaf Miner, White Grub. Spray Chlorpyrifos 20% EC @ 2ml/L or Quinalphos @ 2ml/L.',
      ta: 'சிவப்பு கம்பளிப்புழு, இலைச்சுருட்டுப் புழு, புகையிலை வெட்டுப்புழு. குளோர்பைரிபாஸ் 2 மி.லி/லிட்டர் அல்லது குயினால்பாஸ் தெளிக்கவும்.',
      tanglish: 'Sivappu kambalipuzhu, leaf miner. Chlorpyrifos spray pannunga.',
      majorPests: ['Red Hairy Caterpillar', 'Leaf Miner (சுரங்கப் புழு)', 'Spodoptera (வெட்டுப்புழு)'],
      remedy: 'Install pheromone traps + Spray Chlorpyrifos 2ml/L or Neem oil 3%'
    },
    disease: {
      en: 'Tikka Leaf Spot (Cercospora), Rust, Collar Rot (Aspergillus niger). Spray Carbendazim 12% + Mancozeb 63% WP @ 2g/L or Tebuconazole @ 1ml/L.',
      ta: 'டிக்கா இலைப்புள்ளி நோய் (Tikka leaf spot), துரு நோய், வேரழுகல். கார்பென்டாசிம் + மேன்கோசெப் 2 கிராம்/லிட்டர் அல்லது டெபுகோனசோல் தெளிக்கவும்.',
      tanglish: 'Tikka leaf spot and rust. Mancozeb or Tebuconazole spray pannunga.',
      majorDiseases: ['Tikka Leaf Spot (டிக்கா நோய்)', 'Rust (துரு நோய்)', 'Collar Rot'],
      remedy: 'Seed treat with Trichoderma 4g/kg + Spray Hexaconazole 1ml/L'
    },
    humidity: {
      en: '50% - 70%.',
      ta: '50% முதல் 70% வரை.',
      tanglish: '50% - 70% humidity.',
      idealRange: '50% - 70%'
    },
    sowing: {
      en: 'Seed rate: 50-55 kg kernels/acre for bunch varieties. Treat seeds with Trichoderma viride @ 4g/kg and Rhizobium biofertilizer.',
      ta: 'விதை அளவு: ஏக்கருக்கு 50-55 கிலோ பருப்புகள். டிரைக்கோடெர்மா விரிடி மற்றும் ரைசோபியம் உயிரி உரம் கலந்து விதைக்கவும்.',
      tanglish: '50-55 kg kernels/acre. Seed treatment with Trichoderma & Rhizobium.',
      season: 'Chithirai pattam (Apr - May), Adipattam (Jun - Jul), Karthigai pattam (Nov - Dec)',
      seedRate: '50 - 55 kg kernels/acre'
    },
    pruning: {
      en: 'Light weeding and earthing up before 35 days. IMPORTANT: NEVER weed or hoe after 45 days as it breaks delicate entering pegs!',
      ta: '35 நாட்களுக்குள் களை எடுத்து மண் அணைக்கவும். 45 நாட்களுக்குப் பின் நிலத்தில் கொத்து வேலை செய்யக்கூடாது, விழுதுகள் அறுந்துவிடும்!',
      tanglish: 'Weeding 35 days kulla mudikanum. 45 days apram hoeing panna koodathu - pegs cut aagidum.',
      whenToPrune: 'Earthing-up at 35 DAS (Stop all cultivation after 40 DAS)'
    },
    harvesting: {
      en: 'Harvest when plant leaves turn yellow and inner shell of pods shows prominent black/dark brown veins when split open.',
      ta: 'இலைகள் மஞ்சள் நிறமாக மாறும் போதும், கடலைக் காயை உடைத்துப் பார்த்தால் உட்புறத் தோல் அடர் பழுப்பு/கருப்பு நிற நரம்புகளுடன் திரட்சியாக இருக்கும் போது அறுவடை செய்யவும்.',
      tanglish: 'Vines yellow aagi, shell ullara dark brown colour vein vantha pin harvest pannunga.',
      maturitySigns: 'Yellowing foliage, inner pod shell turns dark brown/black',
      expectedYield: '1000 - 1400 kg dry pods / acre'
    }
  },
  {
    id: 'onion_crop',
    name: 'Small Onion / Shallot',
    tamilName: 'சின்ன வெங்காயம்',
    tanglishName: 'Chinna Vengayam (Shallot)',
    scientificName: 'Allium cepa var. aggregatum',
    category: 'Vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&auto=format&fit=crop&q=80',
    growthDuration: '65 - 75 Days (from bulbs) / 90 Days (from seed)',
    difficulty: 'Easy',
    summary: {
      en: 'High-value kitchen staple of South India. Requires light sandy loam, shallow frequent watering, sulphur nutrition for pungency, and strict Purple Blotch control.',
      ta: 'தமிழ்நாட்டின் அத்தியாவசிய பணப்பயிர். மணல் கலந்த செம்மண், முறையான பாசனம், கந்தக உரம் மற்றும் திருப்பூர் / திண்டுக்கல் பாணி மேட்டுப்பாத்தி சாகுபடி மூலம் அதிக மகசூல் பெறலாம்.',
      tanglish: 'High-value cash crop. Raised bed, shallow irrigation, sulphur uram, and purple blotch control mukkiyam.'
    },
    watering: {
      en: 'Shallow root system requires light, frequent irrigations every 4-6 days. Stop irrigation 10 days before harvesting to cure bulbs.',
      ta: 'வேர்கள் மேலோட்டமாக இருப்பதால் 4-6 நாட்களுக்கு ஒருமுறை லேசான பாசனம் செய்யவும். அறுவடைக்கு 10 நாட்களுக்கு முன் நீரை நிறுத்தவும்.',
      tanglish: '4-6 days once light irrigation. Harvest-ku 10 days mun water stop pannanum.',
      frequency: 'Every 4 - 6 days',
      method: 'Sprinkler / Drip / Micro-sprinkler'
    },
    temperature: {
      en: '15°C to 30°C. Cool weather during vegetative phase and warm dry weather during bulb maturity.',
      ta: '15°C முதல் 30°C வரை. அறுவடை நேரத்தில் நல்ல வெயில் இருக்க வேண்டும்.',
      tanglish: '15°C - 30°C ideal.',
      idealRange: '15°C - 30°C'
    },
    sunlight: {
      en: 'Requires full bright direct sun (7 to 8 hours daily).',
      ta: 'தினமும் 7-8 மணி நேரம் சூரிய ஒளி தேவை.',
      tanglish: '7-8 hours direct sunlight.',
      hours: '7 - 8 Hours Daily'
    },
    soilCare: {
      en: 'Well-drained fertile red loam or sandy loam rich in organic matter. pH 6.0 to 7.2. Sensitive to waterlogging and soil acidity.',
      ta: 'வடிகால் வசதியுள்ள செம்மண் அல்லது மணல் கலந்த வண்டல் மண் சிறந்தது. pH 6.0 முதல் 7.2 வரை.',
      tanglish: 'Well-drained red loam or sandy loam.',
      ph: '6.0 - 7.2',
      soilType: 'Red Loam / Sandy Loam'
    },
    soilTilling: {
      en: 'Plough 4 times to fine tilth. Form ridges and furrows at 45 cm or raised beds of 1.2 m width.',
      ta: 'நிலத்தை 4 முறை நன்கு உழுது மேட்டுப்பாத்திகள் அல்லது பார்கள் அமைக்கவும்.',
      tanglish: 'Fine tilth, form 45cm ridges or raised beds.',
      prepStep: 'Fine tilth with 45cm ridges'
    },
    fertilizing: {
      en: 'NPK 30:25:25 kg/acre. Apply full P and K basal. Apply Nitrogen in two splits (basal and 30 DAS). Apply Sulphur @ 10 kg/acre to boost pungency and storage life.',
      ta: 'ஏக்கருக்கு NPK 30:25:25 கிலோ. தழைச்சத்தை இரு தவணைகளாக இடவும். ஏக்கருக்கு 10 கிலோ சல்பர் (கந்தகம்) இடுவது வெங்காய காரத்தன்மை மற்றும் சேமிப்புத் திறனை அதிகரிக்கும்.',
      tanglish: 'NPK 30:25:25 kg/acre. Sulphur 10kg/acre bulb quality and shelf life increase pannum.',
      npk: '30:25:25 kg/acre + 10 kg Sulphur',
      organic: '10 tonnes FYM + 250 kg Neem Cake/acre'
    },
    repotting: {
      en: 'Plant medium-sized healthy seed bulbs (10-12g) at 15 x 10 cm spacing at 2-3 cm depth. Water immediately.',
      ta: '15 x 10 செ.மீ இடைவெளியில் நடுத்தர வெங்காய விதைக் கிழங்குகளை மேலோட்டமாக ஊன்றவும்.',
      tanglish: '15x10 cm spacing-la seed bulbs plant pannunga.',
      spacing: '15 x 10 cm',
      seedlingAge: 'Bulbs (Direct planted) or 40-day seedlings'
    },
    pestControl: {
      en: 'Thrips (Thrips tabaci), Cutworms. Spray Fipronil 5% SC @ 1.5ml/L or Imidacloprid 17.8% SL @ 0.5ml/L + Sandovit sticker.',
      ta: 'இலைப்பேன் (Thrips), வெட்டுப்புழு. கட்டுப்படுத்த பிப்ரோனில் 1.5 மி.லி/லிட்டர் அல்லது இமிடாக்ளோப்ரிட் தெளிக்கவும்.',
      tanglish: 'Thrips ilai pean problem. Fipronil or Imidacloprid sticker serthu spray pannunga.',
      majorPests: ['Thrips (இலைப்பேன்)', 'Cutworm (வெட்டுப்புழு)'],
      remedy: 'Install blue sticky traps + Spray Fipronil 1.5ml/L'
    },
    disease: {
      en: 'Purple Blotch (Alternaria porri), Basal Rot (Fusarium oxysporum), Stemphylium Blight. Spray Mancozeb @ 2.5g/L or Tebuconazole @ 1ml/L with wetting agent.',
      ta: 'செம்புள்ளி நோய் / கருஞ்சிவப்பு புள்ளி நோய் (Purple blotch), அடி அழுகல் நோய். மேன்கோசெப் 2.5 கிராம்/லிட்டர் அல்லது டெபுகோனசோல் மருந்தை ஒட்டும் திரவத்துடன் தெளிக்கவும்.',
      tanglish: 'Purple blotch noi. Mancozeb 2.5g/L sticker serthu spray pannunga.',
      majorDiseases: ['Purple Blotch (செம்புள்ளி நோய்)', 'Basal Rot (அடி அழுகல்)', 'Downy Mildew'],
      remedy: 'Spray Mancozeb 2.5g/L or Difenoconazole 1ml/L + Sticker'
    },
    humidity: {
      en: '60% - 75%.',
      ta: '60% முதல் 75% வரை.',
      tanglish: '60% - 75% humidity.',
      idealRange: '60% - 75%'
    },
    sowing: {
      en: 'Seed rate: 400 - 500 kg seed bulbs/acre. Treat bulbs with Mancozeb @ 2g/kg or Trichoderma before planting.',
      ta: 'விதை அளவு: ஏக்கருக்கு 400-500 கிலோ நடுத்தர வெங்காயக் கிழங்குகள். பூஞ்சாணக் கொல்லி கொண்டு விதைநேர்த்தி செய்யவும்.',
      tanglish: '400-500 kg seed bulbs/acre. Bulb treatment with Mancozeb.',
      season: 'Vaigasi (May - Jun), Karthigai (Oct - Nov)',
      seedRate: '400 - 500 kg bulbs/acre'
    },
    pruning: {
      en: 'Two hand weedings at 20 and 40 days. Remove any flower stalks (bolting) immediately as they reduce bulb size.',
      ta: '20 மற்றும் 40-வது நாளில் களையெடுக்கவும். இடையில் பூந்தண்டு (வெங்காயப் பூ) வந்தால் உடனே கிள்ளி எறியவும், இல்லையெனில் வெங்காயம் திரளாது.',
      tanglish: '20 and 40 days-la weeding. Flower stalk vantha udane pinch panni eduthurunga.',
      whenToPrune: 'Pinch flower stalks (de-bolting) as soon as visible'
    },
    harvesting: {
      en: 'Harvest when 60-70% of plant tops fall over naturally (neck fall). Pull out gently, cure under partial shade for 3-5 days, and trim foliage leaving 2 cm neck.',
      ta: '60-70% வெங்காய தாள்கள் சாய்ந்து விழும்போது அறுவடை செய்யவும். நிழலில் 3-5 நாட்கள் உலர்த்தி (Curing) 2 செ.மீ தாள் விட்டு நறுக்கி சேமிக்கவும்.',
      tanglish: '60-70% neck fall aana pin harvest pannunga. Shade curing 3-5 days panni save pannunga.',
      maturitySigns: 'Neck fall of 70% plants, dry outer scales with vibrant pink-red skin',
      expectedYield: '5 - 7 tonnes / acre'
    }
  },
  {
    id: 'okra_crop',
    name: "Lady's Finger / Okra",
    tamilName: 'வெண்டைக்காய்',
    tanglishName: 'Vendaikkai (Okra)',
    scientificName: 'Abelmoschus esculentus',
    category: 'Vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=800&auto=format&fit=crop&q=80',
    growthDuration: '90 - 100 Days (First harvest at 45 days)',
    difficulty: 'Easy',
    summary: {
      en: 'Fast-growing warm-season vegetable. Requires regular watering, high nitrogen-phosphorus fertility, picking every 2-3 days, and strict Yellow Vein Mosaic Virus protection.',
      ta: 'விரைவாக பலன் தரும் காய்கறிப் பயிர். 45-வது நாளில் இருந்து 2 நாட்களுக்கு ஒருமுறை தொடர் அறுவடை, மஞ்சள் நரம்பு தேமல் நோய் தடுப்பு மற்றும் காய்ப்புழு கட்டுப்பாடு மூலம் நிறைந்த மகசூல் பெறலாம்.',
      tanglish: 'Fast growing vegetable. Harvest starts at 45 days. Yellow vein mosaic control and fruit borer spray mukkiyam.'
    },
    watering: {
      en: 'Irrigate every 4-5 days in summer and 7-8 days in winter. Critical moisture stage is flowering and pod development.',
      ta: 'கோடையில் 4-5 நாட்களுக்கு ஒருமுறையும், குளிர்காலத்தில் 7-8 நாட்களுக்கு ஒருமுறையும் பாசனம் செய்யவும்.',
      tanglish: 'Every 4-5 days light irrigation. Flowering and pod stage-la water stress vara koodathu.',
      frequency: 'Every 4 - 5 days',
      method: 'Furrow / Drip irrigation'
    },
    temperature: {
      en: '24°C to 35°C. Warm humid weather is ideal.',
      ta: '24°C முதல் 35°C வரை.',
      tanglish: '24°C - 35°C ideal.',
      idealRange: '24°C - 35°C'
    },
    sunlight: {
      en: 'Full direct sunshine (6 to 8 hours daily).',
      ta: 'தினமும் 6 முதல் 8 மணி நேரம் சூரிய ஒளி தேவை.',
      tanglish: '6 - 8 hours direct sun.',
      hours: '6 - 8 Hours Daily'
    },
    soilCare: {
      en: 'Sandy loam to clay loam rich in organic matter. Well-drained soil with pH 6.0 to 7.5.',
      ta: 'மணல் கலந்த வண்டல் மண் அல்லது செம்மண் சிறந்தது. pH 6.0 முதல் 7.5.',
      tanglish: 'Sandy loam or red loam.',
      ph: '6.0 - 7.5',
      soilType: 'Sandy Loam / Red Loam'
    },
    soilTilling: {
      en: 'Plough field 3 times to fine tilth. Form ridges and furrows spaced 45 cm to 60 cm apart.',
      ta: 'நிலத்தை 3 முறை உழுது 60 செ.மீ இடைவெளியில் பார் அமைக்கவும்.',
      tanglish: 'Plough 3 times, form 60cm ridges.',
      prepStep: 'Fine tilth with 60cm ridges'
    },
    fertilizing: {
      en: 'NPK 40:20:20 kg/acre. Apply full P basal, split N in 3 doses (basal, 30 DAS, and 45 DAS). Top dress with Micronutrient spray.',
      ta: 'ஏக்கருக்கு NPK 40:20:20 கிலோ. யூரியாவை 3 முறையாகப் பிரித்து இடவும்.',
      tanglish: 'NPK 40:20:20 kg/acre. Urea 3 splits-la podunga.',
      npk: '40:20:20 kg/acre',
      organic: '8 tonnes FYM + 200 kg Neem Cake/acre'
    },
    repotting: {
      en: 'Direct seeding at 60 x 30 cm spacing (1-2 seeds per hill at 2 cm depth). Soak seeds in water for 12 hours before sowing for fast germination.',
      ta: '60 x 30 செ.மீ இடைவெளியில் 2 செ.மீ ஆழத்தில் விதைகளை ஊன்றவும். விரைவான முளைப்பிற்கு விதைகளை 12 மணி நேரம் தண்ணீரில் ஊறவைத்து விதைக்கவும்.',
      tanglish: '60x30 cm spacing-la seed direct sow pannunga. 12 hours thannila oora vaithu nattal vegama mulaikkum.',
      spacing: '60 x 30 cm',
      seedlingAge: 'Direct Seed Sown'
    },
    pestControl: {
      en: 'Fruit & Shoot Borer (Earias vittella), Whiteflies (vectors of YVMV), Leafhoppers. Spray Emamectin Benzoate 5% SG @ 0.5g/L or Spinosad 45% SC @ 0.3ml/L.',
      ta: 'காய் மற்றும் தண்டுத்துளைப்பான் புழு, அசுவினி, வெள்ளை ஈ. எமாமெக்டின் பென்சோயேட் 0.5 கிராம்/லிட்டர் அல்லது ஸ்பைனோசாட் தெளிக்கவும்.',
      tanglish: 'Kaai thulaipaan puzhu and whitefly. Emamectin or Neem oil spray pannunga.',
      majorPests: ['Fruit and Shoot Borer (காய்ப்புழு)', 'Whitefly (வெள்ளை ஈ)', 'Jassids'],
      remedy: 'Spray Neem oil 3ml/L or Emamectin Benzoate 0.5g/L'
    },
    disease: {
      en: 'Yellow Vein Mosaic Virus (YVMV), Powdery Mildew, Cercospora Leaf Spot. Grow YVMV-resistant hybrids (Co-4, Arka Anamika). Spray Wettable Sulphur @ 2g/L for powdery mildew.',
      ta: 'மஞ்சள் நரம்பு தேமல் நோய் (YVMV), சாம்பல் நோய். நோய் எதிர்ப்பு ரகங்களான அர்கா அனாமிகா, கோ-4 பயிரிடவும். நனையும் கந்தகம் 2 கிராம்/லிட்டர் தெளிக்கவும்.',
      tanglish: 'Yellow vein mosaic virus (YVMV) thadukka whitefly control pannanum and resistant variety vaanganum.',
      majorDiseases: ['Yellow Vein Mosaic Virus (மஞ்சள் நரம்பு நோய்)', 'Powdery Mildew (சாம்பல் நோய்)'],
      remedy: 'Control whitefly vector with Imidacloprid + Spray Wettable Sulphur 2g/L'
    },
    humidity: {
      en: '60% - 80%.',
      ta: '60% முதல் 80% வரை.',
      tanglish: '60% - 80% humidity.',
      idealRange: '60% - 80%'
    },
    sowing: {
      en: 'Seed rate: 3 - 3.5 kg/acre for summer, 2.5 - 3 kg/acre for rainy season. Treat with Trichoderma @ 4g/kg.',
      ta: 'விதை அளவு: ஏக்கருக்கு 3 கிலோ. டிரைக்கோடெர்மா விரிடி கொண்டு விதைநேர்த்தி செய்யவும்.',
      tanglish: 'Seed rate 3 kg/acre. Seed treatment with Trichoderma.',
      season: 'Feb - Mar (Summer), Jun - Aug (Rainy season)',
      seedRate: '3 kg / acre'
    },
    pruning: {
      en: 'Nipping: Pinch terminal shoots at 45-50 days to induce more lateral branches and double the number of fruit-bearing nodes.',
      ta: 'நுனி கிள்ளுதல் (Nipping): 45-ம் நாளில் செடியின் நுனியை லேசாகக் கிள்ளிவிட்டால் பக்கக் கிளைகள் அதிகமாகி காய்கள் இருமடங்கு பிடிக்கும்.',
      tanglish: '45th day-la thalaikilluthal (nipping) panna pakka kilaigal perugi excess yield varum.',
      whenToPrune: 'Pinch apical shoot at 45 DAS'
    },
    harvesting: {
      en: 'Harvest tender, bright green, non-fibrous pods every alternate day (45 days after sowing onwards). Pod tip should snap cleanly when bent.',
      ta: 'நடவு செய்த 45-ம் நாள் முதல் 2 நாட்களுக்கு ஒருமுறை இளங்காய்களை அறுவடை செய்யவும். நுனியை ஒடித்தால் நச்சென்று உடைய வேண்டும்.',
      tanglish: '45th day mudhal 2 days once tender green pod harvest pannunga. Tip bend panna snap aaganum.',
      maturitySigns: 'Tender medium pods (8-10 cm), soft tips that snap easily without strings',
      expectedYield: '4.5 - 6.5 tonnes / acre'
    }
  }
];

