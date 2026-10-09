import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Camera, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Droplets, 
  FlaskConical, 
  ShieldCheck, 
  Bug, 
  ChevronRight,
  ExternalLink,
  Search,
  BookOpen,
  Filter,
  Layers,
  Sprout,
  X,
  FileText
} from 'lucide-react';
import { Language } from '../types';

import roseThripsImg from '../assets/images/rose_thrips_blight_1790834417371.jpg';
import roseBotrytisImg from '../assets/images/rose_botrytis_rot_1790834431352.jpg';
import jasmineMidgeImg from '../assets/images/jasmine_bud_pest_1790834446898.jpg';
import jasmineBlightImg from '../assets/images/jasmine_blight_rot_1790834465170.jpg';
import roseStemDiebackImg from '../assets/images/rose_stem_dieback_1790834541126.jpg';
import hibiscusMealybugImg from '../assets/images/hibiscus_mealybug_1790834560780.jpg';

interface ChooseAffectedPartViewProps {
  currentLanguage: Language;
  onBack: () => void;
  onStartAnalysisWithPart: (part: string, mode: 'camera' | 'upload') => void;
}

export interface DiseaseInfo {
  id: string;
  cropName: string;
  tamilCropName: string;
  name: string;
  tamilName: string;
  symptoms: string;
  tamilSymptoms: string;
  causes: string;
  tamilCauses: string;
  chemicalRemedy: string;
  organicRemedy: string;
  affectedCrops: string;
  severity: 'High' | 'Medium' | 'Low';
  sampleImage: string;
}

export interface AffectedPartItem {
  id: string;
  title: string;
  tamilTitle: string;
  description: string;
  tamilDescription: string;
  imageUrl: string;
  commonDiseases: DiseaseInfo[];
}

export const AFFECTED_PARTS_DATA: AffectedPartItem[] = [
  // 1. FLOWER - ALL FLOWERS & CROPS
  {
    id: 'flower',
    title: 'Flower',
    tamilTitle: 'மலர்கள் & பூக்கள்',
    description: "Flowers wilting, dropping prematurely, bud borer, or petal blight across all flowering crops",
    tamilDescription: 'ரோஜா, மல்லிகை, சாமந்தி, தக்காளி, பருத்தி, மிளகாய் உள்ளிட்ட அனைத்து பயிர்களின் பூ உதிர்தல் & பூ நோய்கள்',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&auto=format&fit=crop&q=80',
    commonDiseases: [
      {
        id: 'flower_rose_thrips',
        cropName: 'Rose',
        tamilCropName: 'ரோஜா மலர்',
        name: 'Rose Flower Thrips & Petal Blight',
        tamilName: 'ரோஜா மலர் இலைப்பேன் & இதழ் கருகல்',
        symptoms: 'Flower buds fail to open, petal margins turn brown and burnt, blackened petal tips, distorted deformed roses.',
        tamilSymptoms: 'ரோஜா மொட்டுகள் மலராமல் சுருங்குதல், இதழ்களின் விளிம்புகள் தீய்ந்து பழுப்பு நிறமாதல், மலர் உதிர்தல்.',
        causes: 'Microscopic Frankliniella thrips feeding on tender petals and sucking vital flower sap.',
        tamilCauses: 'நுண்ணிய இலைப்பேன்கள் இளம் ரோஜா மொட்டுகளில் நுழைந்து சாற்றை உறிஞ்சுவது.',
        chemicalRemedy: 'Fipronil 5% SC @ 1.5ml/L or Spinosad 45% SC @ 0.3ml/L sprayed early morning into buds.',
        organicRemedy: 'Spray 5% Neem seed kernel extract (NSKE) or hanging Blue sticky traps near rose bushes.',
        affectedCrops: 'Rose (ரோஜா), Gerbera, Carnation',
        severity: 'High',
        sampleImage: roseThripsImg
      },
      {
        id: 'flower_rose_botrytis',
        cropName: 'Rose',
        tamilCropName: 'ரோஜா மலர்',
        name: 'Botrytis Rose Bud Rot (Gray Mold)',
        tamilName: 'ரோஜா மொட்டு அழுகல் நோய்',
        symptoms: 'Soft brown water-soaked lesions on petals, flower heads rot into mush covered with velvety gray fungal fuzz.',
        tamilSymptoms: 'ரோஜா மொட்டுக்கள் அழுகி பழுப்பு நிறமாக மாறுவதுடன் சாம்பல் நிற பூஞ்சாணப் படலம் மூடுதல்.',
        causes: 'Botrytis cinerea fungus stimulated by damp cool nights and water droplets sitting on unopened buds.',
        tamilCauses: 'இரவு நேர பனி ஈரப்பதம் மற்றும் மொட்டுகளின் மேல் தண்ணீர் தேங்குவதால் ஏற்படும் பூஞ்சாணம்.',
        chemicalRemedy: 'Carbendazim 50% WP @ 1g/L or Iprodione @ 1.5g/L foliar spray.',
        organicRemedy: 'Prune away rotting buds immediately; ensure morning sunlight and good air circulation.',
        affectedCrops: 'Rose (ரோஜா), Chrysanthemum',
        severity: 'Medium',
        sampleImage: roseBotrytisImg
      },
      {
        id: 'flower_jasmine_midge',
        cropName: 'Jasmine',
        tamilCropName: 'குண்டு மல்லிகை',
        name: 'Jasmine Blossom Midge & Bud Worm',
        tamilName: 'மல்லிகை மொட்டுப் புழு & ஈ தாக்குதல்',
        symptoms: 'Buds turn pale pinkish-violet, fail to expand, hole in bud base with tiny yellowish maggots inside.',
        tamilSymptoms: 'மல்லிகை மொட்டுகள் ஊதா/சிவப்பு நிறமாக மாறுதல், மொட்டின் அடியில் துளை மற்றும் புழுக்கள் இருத்தல்.',
        causes: 'Contarinia maculipennis gall midge laying eggs inside tender unopened jasmine buds.',
        tamilCauses: 'மல்லிகை மொட்டு ஈ மொட்டுகளுக்குள் முட்டையிட்டு புழுக்கள் உட்புற மகரந்தத்தை உண்பது.',
        chemicalRemedy: 'Spray Thiamethoxam 25% WG @ 0.5g/L or Chlorantraniliprole @ 0.3ml/L at early bud initiation.',
        organicRemedy: 'Spray 3% Neem oil + ginger-garlic extract; rake soil around bushes to expose pupae to sun.',
        affectedCrops: 'Jasmine (மல்லிகை, முல்லை, பிச்சி)',
        severity: 'High',
        sampleImage: jasmineMidgeImg
      },
      {
        id: 'flower_jasmine_blight',
        cropName: 'Jasmine',
        tamilCropName: 'குண்டு மல்லிகை',
        name: 'Jasmine Blossom Blight & Wilt',
        tamilName: 'மல்லிகைப் பூ கருகல் நோய்',
        symptoms: 'Brown drying of blossom petals, blossoms drop off before picking, withered brown bunches.',
        tamilSymptoms: 'மலர்கள் பழுப்பு நிறமாகி வாடி உதிர்தல்; பூக்கள் மலர்வதற்கு முன்பே கொத்தாக காய்ந்து போதல்.',
        causes: 'Cercospora & Alternaria fungal complex active during humid overcast weather.',
        tamilCauses: 'அதிக ஈரப்பதத்தால் காற்றில் பரவும் பூஞ்சாண வித்துக்கள்.',
        chemicalRemedy: 'Spray Mancozeb 75% WP @ 2g/L or Copper Oxychloride @ 2.5g/L.',
        organicRemedy: 'Spray fermented sour buttermilk (புளித்த மோர் 1:10) with turmeric powder.',
        affectedCrops: 'Jasmine (மல்லிகை)',
        severity: 'Medium',
        sampleImage: jasmineBlightImg
      },
      {
        id: 'flower_marigold_blight',
        cropName: 'Marigold',
        tamilCropName: 'சாமந்தி / செவ்வந்தி',
        name: 'Marigold Inflorescence & Flower Head Blight',
        tamilName: 'சாமந்தி பூத்தட்டு அழுகல் நோய்',
        symptoms: 'Flower head disks turn brown and decay, petals collapse inward, black specks on ray florets.',
        tamilSymptoms: 'சாமந்தி பூக்களின் நடுப்பகுதி அழுகி பழுப்பு நிறமாதல், மலர் இதழ்கள் வாடி உதிர்ந்து நாற்றமடித்தல்.',
        causes: 'Alternaria dianthi fungal pathogen favored by overhead sprinkling onto blooming marigolds.',
        tamilCauses: 'பூக்களின் மேல் நீர் பாய்ச்சுவதால் பூஞ்சாணம் வேகமாகப் பரவுகிறது.',
        chemicalRemedy: 'Spray Difenoconazole 25% EC @ 1ml/L or Azoxystrobin @ 1ml/L.',
        organicRemedy: 'Apply water only at the root base; spray Trichoderma viride 10g/L.',
        affectedCrops: 'Marigold (சாமந்தி), Calendula',
        severity: 'Medium',
        sampleImage: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'flower_hibiscus_mealybug',
        cropName: 'Hibiscus',
        tamilCropName: 'செம்பருத்தி',
        name: 'Hibiscus Bud Drop & Flower Mealybug',
        tamilName: 'செம்பருத்தி பூ மொட்டு உதிர்தல் & மாவுப்பூச்சி',
        symptoms: 'Thick white waxy cotton-like clusters inside flower buds, flower buds turn yellow and fall off before opening.',
        tamilSymptoms: 'பூ மொட்டுகளின் காம்புகளில் வெள்ளை நிற மாவு போன்ற பூச்சிகள் படர்தல்; மொட்டுகள் திறக்காமல் உதிர்தல்.',
        causes: 'Paracoccus marginatus mealybug infesting calyx and secreting sticky honeydew attracting sooty mold.',
        tamilCauses: 'மாவுப்பூச்சிகள் மொட்டின் சாற்றை உறிஞ்சி கழிக்கப்படுவதால் மொட்டுகள் பலவீனமடைகின்றன.',
        chemicalRemedy: 'Spray Profenofos 50% EC @ 2ml/L or Imidacloprid 17.8% SL @ 0.5ml/L.',
        organicRemedy: 'Wash buds with pressurized soap water solution (5ml shampoo/L); spray 5% Neem oil.',
        affectedCrops: 'Hibiscus (செம்பருத்தி), Cotton, Papaya',
        severity: 'High',
        sampleImage: hibiscusMealybugImg
      },
      {
        id: 'flower_tomato_drop',
        cropName: 'Tomato',
        tamilCropName: 'தக்காளி',
        name: 'Tomato Blossom Drop (Blossom Abscission)',
        tamilName: 'தக்காளி பூ உதிர்தல் பிரச்சனை',
        symptoms: 'Flower stems turn yellow at the abscission joint, unfertilized flowers drop off leaving bare trusses without fruit.',
        tamilSymptoms: 'பூவின் காம்பு மஞ்சள் நிறமாக மாறி காய் பிடிப்பதற்கு முன்பே கொத்தாக உதிர்ந்து விழுதல்.',
        causes: 'Temperatures exceeding 35°C, high nighttime heat, dry hot winds, or nitrogen imbalance.',
        tamilCauses: 'கடும் வெயில் மற்றும் காற்று வறட்சி; மகரந்தச் சேர்க்கை தடைபடுவது.',
        chemicalRemedy: 'Foliar spray with NAA (Planofix) @ 1ml in 4.5 litres of water or Boron 20% @ 1.5g/L.',
        organicRemedy: 'Spray Egg-amino acid extract (முட்டை அமினோ அமிலம்) or 2% Panchagavya in evening hours.',
        affectedCrops: 'Tomato (தக்காளி), Chilli, Brinjal',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'flower_cotton_square_drop',
        cropName: 'Cotton',
        tamilCropName: 'பருத்தி',
        name: 'Cotton Square Drop & Pink Bollworm in Flower',
        tamilName: 'பருத்தி சப்பை உதிர்தல் & ரோஜா நிற பூப்புழு',
        symptoms: 'Tender flower buds (squares) turn yellow and shed; flowers show rosette appearance (petals twisted together).',
        tamilSymptoms: 'பருத்தி சப்பைகள் கொட்டிவிடுதல், பூக்கள் மலராமல் ரோஜா பூ வடிவில் முறுக்கிக் கொண்டு புழு இருத்தல்.',
        causes: 'Pectinophora gossypiella (Pink bollworm) larvae feeding inside flowers preventing boll formation.',
        tamilCauses: 'இளம் புழுக்கள் பூக்களுக்குள் நுழைந்து மகரந்தத்தை உண்டு பூவை முடிக்கி விடுவது.',
        chemicalRemedy: 'Spray Emamectin Benzoate 5% SG @ 0.5g/L or Chlorantraniliprole 18.5% SC @ 0.3ml/L.',
        organicRemedy: 'Install Pink bollworm pheromone traps (Phero-traps 8/acre); spray Bacillus thuringiensis (Bt).',
        affectedCrops: 'Cotton (பருத்தி), Okra',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'flower_banana_cigar_end',
        cropName: 'Banana',
        tamilCropName: 'வாழை மலர் / பூ',
        name: 'Banana Inflorescence Cigar End Rot',
        tamilName: 'வாழை பூ நுனி அழுகல் நோய்',
        symptoms: 'Dry black rot extending from the floral blossom end of banana fingers resembling the ash of a burned cigar.',
        tamilSymptoms: 'வாழைப் பூவின் முனையிலிருந்து காய் நோக்கி சுருட்டு சாம்பல் போன்ற கருப்பு நிற உலர்ந்த அழுகல் பரவுதல்.',
        causes: 'Verticillium theobromae & Trachysphaera fungi colonizing persistent flower parts during rains.',
        tamilCauses: 'மழைக் காலத்தில் பூவிதழ்களில் தங்கும் பூஞ்சாணம் காய் முனையைத் தாக்குதல்.',
        chemicalRemedy: 'Spray Copper Oxychloride @ 2.5g/L or Mancozeb @ 2g/L directly on the emerging bunch.',
        organicRemedy: 'Remove dead perianth floral remnants (pistil/flower tips) by hand after fingers form; bag bunches.',
        affectedCrops: 'Banana (வாழை)',
        severity: 'Medium',
        sampleImage: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'flower_mango_powdery_mildew',
        cropName: 'Mango',
        tamilCropName: 'மாமரம் பூங்கொத்து',
        name: 'Mango Inflorescence Powdery Mildew & Hopper',
        tamilName: 'மாம்பூ சாம்பல் நோய் & பூந்தத்துப்பூச்சி',
        symptoms: 'White powdery coating on floral panicles, blossom stalks turn brown, flowers wither and drop without setting fruit.',
        tamilSymptoms: 'மாம்பூங்கொத்துகளில் வெள்ளை நிற மாவுப் படலம், பூக்கள் கருகி உதிர்ந்து மாங்காய் பிடிக்காமல் போதல்.',
        causes: 'Oidium mangiferae fungal spores spread by morning fog and cool humid weather during flowering.',
        tamilCauses: 'பனிப்பொழிவு மற்றும் தத்துப்பூச்சிகள் சாற்றை உறிஞ்சி பூக்களைக் காய வைப்பது.',
        chemicalRemedy: 'Spray Wettable Sulphur 80% WP @ 2g/L or Hexaconazole 5% EC @ 1ml/L at bud break & full bloom.',
        organicRemedy: 'Spray 5% sour buttermilk with baking soda (5g/L) or Neem oil 3ml/L.',
        affectedCrops: 'Mango (மாமரம்)',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'flower_coconut_button_shedding',
        cropName: 'Coconut',
        tamilCropName: 'தென்னை பாளை & பொத்தான்',
        name: 'Coconut Button Shedding & Inflorescence Rot',
        tamilName: 'தென்னை பொத்தான் உதிர்தல் & பாளை அழுகல்',
        symptoms: 'Female flowers (buttons) fall off in massive numbers shortly after pollination; blackened flower stalks.',
        tamilSymptoms: 'பாளை வெடித்த பின் பிஞ்சுகள் (பொத்தான்கள்) பெருமளவில் உதிர்ந்து விழுதல்; பாளை கருகி அழுகுதல்.',
        causes: 'Boron / Potassium deficiency, severe soil drought in summer, or Eriophyid mite attack under button calyx.',
        tamilCauses: 'போரான் மற்றும் பொட்டாஷ் சத்து பற்றாக்குறை, கோடை நீர் வறட்சி அல்லது மண்டி வண்டு தாக்குதல்.',
        chemicalRemedy: 'Root feeding with Coconut Tonic (TNAU) @ 200ml/tree or spray Borax @ 2g/L on inflorescence.',
        organicRemedy: 'Apply 50kg farmyard manure + 2kg neem cake per palm; maintain regular summer drip irrigation.',
        affectedCrops: 'Coconut (தென்னை), Arecanut',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'flower_chilli_blossom_drop',
        cropName: 'Chilli',
        tamilCropName: 'மிளகாய்',
        name: 'Chilli Blossom Drop & Flower Thrips',
        tamilName: 'மிளகாய் பூ உதிர்தல் & இலைப்பேன்',
        symptoms: 'Flowers turn yellow at petal base and fall; distorted flower buds with brown scratches inside petals.',
        tamilSymptoms: 'மிளகாய் பூக்கள் காம்புடன் உதிர்தல், மொட்டுகள் திறக்காமல் காய்ந்து விழுதல்.',
        causes: 'Scirtothrips dorsalis rasping flower petals, compounded by extreme heat waves.',
        tamilCauses: 'பூக்களில் இலைப்பேன்கள் புகுந்து மகரந்தக் கூட்டை சேதப்படுத்துவது.',
        chemicalRemedy: 'Fipronil 5% SC @ 1.5ml/L or Flonicamid 50% WG @ 0.3g/L spray.',
        organicRemedy: 'Install Blue sticky traps (10/acre); spray 3% Neem oil + ginger-garlic extract.',
        affectedCrops: 'Chilli (மிளகாய்), Capsicum',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&auto=format&fit=crop&q=80'
      }
    ]
  },

  // 2. LEAVES - ALL CROPS
  {
    id: 'leaves',
    title: 'Leaves',
    tamilTitle: 'இலைகள்',
    description: 'Blight, powdery mildew, rust, leaf spots, and curl virus across all agricultural species',
    tamilDescription: 'நெல், தக்காளி, உருளை, பருத்தி, வாழை, தென்னை, மஞ்சள் உள்ளிட்ட அனைத்து பயிர்களின் இலை நோய்கள்',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80',
    commonDiseases: [
      {
        id: 'leaf_paddy_blast',
        cropName: 'Paddy / Rice',
        tamilCropName: 'நெல் பயிர்',
        name: 'Rice Leaf Blast (Magnaporthe oryzae)',
        tamilName: 'நெல் இலை குலை நோய்',
        symptoms: 'Spindle-shaped or eye-shaped lesions with grayish centers and dark brown margins merging together to burn entire leaf blade.',
        tamilSymptoms: 'இலைகளில் கண் போன்ற அல்லது கதிர் போன்ற நீள்வட்டப் புள்ளிகள் தோன்றி, இலைகள் தீயில் கருகியது போல் மாறுதல்.',
        causes: 'Magnaporthe oryzae fungus favored by excess nitrogen fertilizer, dense planting, and cloudy humid weather.',
        tamilCauses: 'அதிகப்படியான யூரியா உரம் மற்றும் பனிமூட்டமான ஈரப்பதம் மூலம் காற்றில் பரவுகிறது.',
        chemicalRemedy: 'Spray Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L at tillering stage.',
        organicRemedy: 'Seed treatment with Pseudomonas fluorescens @ 10g/kg; spray 3% Panchagavya.',
        affectedCrops: 'Paddy / Rice (நெல்)',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'leaf_tomato_early_blight',
        cropName: 'Tomato',
        tamilCropName: 'தக்காளி',
        name: 'Early Blight (Alternaria solani)',
        tamilName: 'தக்காளி இலைக்கருகல் நோய்',
        symptoms: 'Concentric ring-shaped brown target spots starting on bottom older leaves, turning leaves yellow and crispy dry.',
        tamilSymptoms: 'அடி இலைகளில் வளைய வடிவிலான அடர் பழுப்பு புள்ளிகள் தோன்றி, இலைகள் காய்ந்து சருகாக மாறும்.',
        causes: 'Alternaria solani fungal spores spread via splash water and high humidity.',
        tamilCauses: 'அல்டர்நேரியா பூஞ்சாணம், அதிக ஈரப்பதம் மற்றும் இலைகள் நனைவதால் பரவுகிறது.',
        chemicalRemedy: 'Spray Mancozeb 75% WP @ 2g/L or Azoxystrobin 23% SC @ 1ml/L at first sign.',
        organicRemedy: 'Spray 5% Neem oil or Pseudomonas fluorescens 10g/L; prune lower infected foliage.',
        affectedCrops: 'Tomato, Potato, Chilli, Brinjal',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'leaf_potato_late_blight',
        cropName: 'Potato',
        tamilCropName: 'உருளைக்கிழங்கு',
        name: 'Late Blight (Phytophthora infestans)',
        tamilName: 'உருளை பின் பருவ கருகல் நோய்',
        symptoms: 'Large, dark, water-soaked lesions on leaf margins with white downy fungal mildew on undersides during morning mist.',
        tamilSymptoms: 'இலை விளிம்புகளில் நீர் ஊறிய கரும்பழுப்பு புள்ளிகள் தோன்றி, இலையின் அடியில் வெள்ளை பூஞ்சாணம் படர்தல்.',
        causes: 'Phytophthora infestans water-mold spreading with extreme speed during cool, wet, foggy weather.',
        tamilCauses: 'குளிர்ந்த மழை மற்றும் தொடர் பனிமூட்டத்தால் வேகமாக பரவும் பூஞ்சாணம்.',
        chemicalRemedy: 'Spray Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L or Cymoxanil @ 2g/L.',
        organicRemedy: 'Destroy infected haulms immediately; hill up soil deeply to protect potato tubers.',
        affectedCrops: 'Potato (உருளை), Tomato',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'leaf_chilli_curl',
        cropName: 'Chilli',
        tamilCropName: 'மிளகாய்',
        name: 'Chilli Leaf Curl Virus Complex (TLCV)',
        tamilName: 'மிளகாய் இலைச்சுருட்டு நச்சுயிரி நோய்',
        symptoms: 'Upward curling of leaves (boat-shaped) from thrips; downward curling (inverted cup) from mites; stunted bushy plants.',
        tamilSymptoms: 'இலைகள் மேல்நோக்கி அல்லது கீழ்நோக்கி சுருண்டு, நரம்புகள் தடித்து பயிர் வளர்ச்சி குன்றுதல்.',
        causes: 'Vector insects (Thrips and Whiteflies) injecting plant viruses while feeding on leaf sap.',
        tamilCauses: 'வெள்ளை ஈக்கள் மற்றும் இலைப்பேன்கள் மூலம் பயிருக்கு வைரஸ் பரவுவது.',
        chemicalRemedy: 'Spray Diafenthiuron 50% WP @ 1g/L or Spiromesifen 22.9% SC @ 1ml/L for mite & thrip control.',
        organicRemedy: 'Install yellow & blue sticky traps (15/acre); spray 5% Neem oil + ginger-garlic-chilli extract.',
        affectedCrops: 'Chilli (மிளகாய்), Capsicum',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'leaf_banana_sigatoka',
        cropName: 'Banana',
        tamilCropName: 'வாழை',
        name: 'Banana Sigatoka Leaf Spot (Mycosphaerella)',
        tamilName: 'வாழை சிகாடோகா இலைப்புள்ளி நோய்',
        symptoms: 'Yellow streaks running parallel to leaf veins, turning dark brown with gray dried centres, drying entire leaf canopy.',
        tamilSymptoms: 'இலையில் நரம்புகளுக்கு இணையாக மஞ்சள் கோடுகள் தோன்றி, பின்னர் அடர் பழுப்பு நிறமாகி முழு இலையும் காய்ந்து தொங்குதல்.',
        causes: 'Mycosphaerella musicola fungal spores thriving in humid plantations and poor leaf ventilation.',
        tamilCauses: 'காற்றில் பரவும் பூஞ்சாணம்; அதிக அடர்த்தியாக வாழை நடுவது மற்றும் நீர் தேங்குவது.',
        chemicalRemedy: 'Spray Propiconazole 25% EC @ 1ml/L or Mineral Oil (Banole) 10ml/L emulsified with Mancozeb.',
        organicRemedy: 'Deleaf infected dried foliage and burn outside field; spray 3% Panchagavya.',
        affectedCrops: 'Banana (வாழை)',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'leaf_cotton_bacterial_blight',
        cropName: 'Cotton',
        tamilCropName: 'பருத்தி',
        name: 'Cotton Bacterial Blight / Angular Leaf Spot',
        tamilName: 'பருத்தி பாக்டீரியா இலைப்புள்ளி நோய்',
        symptoms: 'Angular water-soaked spots bounded by leaf veinlets, turning dark brown to black (black arm symptom on branches).',
        tamilSymptoms: 'இலை நரம்புகளுக்கு இடையே கோண வடிவ நீர் ஊறிய புள்ளிகள் தோன்றி கருப்பாக மாறுதல்.',
        causes: 'Xanthomonas citri pv. malvacearum bacteria splashing through raindrops and driving winds.',
        tamilCauses: 'மழைநீர் துளிகள் வழியாக பரவும் பாக்டீரியா தொற்று.',
        chemicalRemedy: 'Spray Streptocycline 1g + Copper Oxychloride 25g in 10 litres of water.',
        organicRemedy: 'Treat seeds with cow urine (10%) or hot water (52°C for 10 min) before sowing.',
        affectedCrops: 'Cotton (பருத்தி)',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'leaf_coconut_rot',
        cropName: 'Coconut',
        tamilCropName: 'தென்னை',
        name: 'Coconut Leaf Rot & Grey Leaf Blight',
        tamilName: 'தென்னை இலை அழுகல் & சாம்பல் கருகல்',
        symptoms: 'Distal ends of leaflets turn black and rot away, leaves break down leaving fan-like shriveled fronds.',
        tamilSymptoms: 'ஓலைகளின் நுனிப்பகுதி கருப்பாகி அழுகி விழுதல், ஓலைகள் உடைந்து விசிறி போல் தோற்றமளித்தல்.',
        causes: 'Bipolaris & Colletotrichum fungal attack succeeding root wilt infected weakened palms.',
        tamilCauses: 'வேர்வாடல் நோயால் பலவீனமடைந்த மரங்களை தாக்கும் பூஞ்சாணம்.',
        chemicalRemedy: 'Pour Contaf (Hexaconazole 5% EC) @ 2ml in 300ml water around root or crown spray with Bordeaux 1%.',
        organicRemedy: 'Pour Pseudomonas fluorescens slurry (50g in 500ml water) into the crown axil.',
        affectedCrops: 'Coconut (தென்னை)',
        severity: 'Medium',
        sampleImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'leaf_onion_purple_blotch',
        cropName: 'Onion',
        tamilCropName: 'சின்ன வெங்காயம்',
        name: 'Onion Purple Blotch (Alternaria porri)',
        tamilName: 'வெங்காய ஊதா இலைக்கருகல் நோய்',
        symptoms: 'Small water-soaked lesions that enlarge into sunken purple-centered elliptical patches with yellow halos.',
        tamilSymptoms: 'இலைகளில் ஊதா நிற மையத்துடன் கூடிய நீள்வட்டப் புள்ளிகள் தோன்றி, இலைகள் நடுவில் முறிந்து விழுதல்.',
        causes: 'Alternaria porri fungus transmitted via rain splash and heavy dew during bulb formation.',
        tamilCauses: 'பனிப்பொழிவு மற்றும் மழைநீர் தெறிப்பதால் பரவும் பூஞ்சாணம்.',
        chemicalRemedy: 'Spray Tebuconazole 25.9% EC @ 1.5ml/L or Mancozeb @ 2.5g/L with sticking agent (Triton).',
        organicRemedy: 'Crop rotation with non-allium crops; spray fermented garlic-neem liquid.',
        affectedCrops: 'Onion (வெங்காயம்), Garlic',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'leaf_turmeric_spot',
        cropName: 'Turmeric',
        tamilCropName: 'மஞ்சள்',
        name: 'Turmeric Leaf Spot & Leaf Blotch',
        tamilName: 'மஞ்சள் இலைப்புள்ளி & கருகல் நோய்',
        symptoms: 'Small oval rectangular spots with gray centers on both leaf sides; severely blighted leaves dry prematurely.',
        tamilSymptoms: 'இலையின் இருபுறமும் சாம்பல் நிற மையமுடைய செவ்வகப் புள்ளிகள் தோன்றி இலைகள் காய்ந்து போதல்.',
        causes: 'Colletotrichum capsici & Taphrina maculans fungal pathogens spreading in warm moist field trenches.',
        tamilCauses: 'பாத்திகளில் அதிக ஈரப்பதம் மற்றும் கொலிட்டோட்ரைகம் பூஞ்சாணம்.',
        chemicalRemedy: 'Spray Carbendazim 12% + Mancozeb 63% WP (SAAF) @ 2g/L or Azoxystrobin @ 1ml/L.',
        organicRemedy: 'Soil application of Trichoderma viride enriched FYM @ 250 kg/acre; spray 3% Panchagavya.',
        affectedCrops: 'Turmeric (மஞ்சள்), Ginger',
        severity: 'Medium',
        sampleImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'leaf_grape_downy_mildew',
        cropName: 'Grape',
        tamilCropName: 'திராட்சை',
        name: 'Grape Downy Mildew & Powdery Mildew',
        tamilName: 'திராட்சை அடிச்சாம்பல் & சாம்பல் நோய்',
        symptoms: 'Yellow translucent oil spots on upper leaf surface, delicate white cottony down on underside.',
        tamilSymptoms: 'இலையின் மேற்பகுதியில் எண்ணெய் கசிந்தது போன்ற மஞ்சள் புள்ளிகள், கீழ்ப்பகுதியில் வெண்பூஞ்சாணம்.',
        causes: 'Plasmopara viticola oomycete surviving in fallen dead vine debris.',
        tamilCauses: 'குளிர்ந்த காற்று மற்றும் இலை நனைவு காலத்தில் பரவும் பூஞ்சாணம்.',
        chemicalRemedy: 'Spray Bordeaux mixture 1% or Metalaxyl-Mancozeb @ 2.5g/L before flowering and after pruning.',
        organicRemedy: 'Thin canopy shoots for maximum ventilation; spray sour buttermilk solution.',
        affectedCrops: 'Grape (திராட்சை)',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&auto=format&fit=crop&q=80'
      }
    ]
  },

  // 3. STEM - ALL CROPS
  {
    id: 'stem',
    title: 'Stem',
    tamilTitle: 'தண்டு & கிளைகள்',
    description: 'Stem rot, borers, red rot, cankers, dieback, and shoot wilting across all crops',
    tamilDescription: 'கரும்பு செவ்வழுகல், நெல் தண்டுத்துளைப்பான், வாழை தண்டு வண்டு, பருத்தி தண்டு கூன்வண்டு உள்ளிட்ட தண்டு நோய்கள்',
    imageUrl: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&auto=format&fit=crop&q=80',
    commonDiseases: [
      {
        id: 'stem_sugarcane_red_rot',
        cropName: 'Sugarcane',
        tamilCropName: 'கரும்பு',
        name: 'Sugarcane Red Rot (Colletotrichum falcatum)',
        tamilName: 'கரும்பு செவ்வழுகல் நோய்',
        symptoms: 'Canes show hollow pith turning dull red with transverse white patches; alcoholic fermentation odor when stalk is split.',
        tamilSymptoms: 'கரும்பின் தண்டை பிளந்து பார்த்தால் உட்பகுதி சிவப்பாகி வெள்ளை திட்டுகளுடன் சாராய நாற்றம் வீசுதல்.',
        causes: 'Colletotrichum falcatum fungus transmitted through infected seed setts and irrigation channels.',
        tamilCauses: 'நோய் தாக்கிய விதைக்கரணைகள் மற்றும் பாசன நீர் மூலம் பரவும் பூஞ்சாணம்.',
        chemicalRemedy: 'Sett treatment with Carbendazim 50% WP @ 1g/L for 15 minutes before planting.',
        organicRemedy: 'Dip setts in Trichoderma viride suspension; burn infected dried trash; practice 2-year crop rotation.',
        affectedCrops: 'Sugarcane (கரும்பு)',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'stem_rice_borer',
        cropName: 'Paddy / Rice',
        tamilCropName: 'நெல்',
        name: 'Yellow Stem Borer / Dead Heart & White Earhead',
        tamilName: 'நெல் தண்டுத்துளைப்பான் & வெண்கதிர்',
        symptoms: 'Central shoot dries up turning straw-colored (dead heart) in tillering stage; empty white chafe panicles (white ear) at flowering.',
        tamilSymptoms: 'வளர்ச்சிப் பருவத்தில் நடுக்குருத்து காய்ந்து வருதல் (Dead Heart); கதிர் பருவத்தில் மணிகள் இல்லாமல் வெண்கதிர் தோன்றுதல்.',
        causes: 'Scirpophaga incertulas moth caterpillar tunneling inside stem and severing nutrient tubes.',
        tamilCauses: 'தண்டுத்துளைப்பான் அந்துப்பூச்சியின் புழுக்கள் தண்டுக்குள் புகுந்து திசுக்களை உண்பது.',
        chemicalRemedy: 'Apply Cartap Hydrochloride 4G granules @ 8kg/acre or spray Chlorantraniliprole 18.5% SC @ 0.3ml/L.',
        organicRemedy: 'Install pheromone traps (5/acre); release Trichogramma egg parasitoid cards (2 cards/acre).',
        affectedCrops: 'Paddy / Rice (நெல்)',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'stem_banana_weevil',
        cropName: 'Banana',
        tamilCropName: 'வாழை',
        name: 'Banana Pseudostem Weevil / Borer',
        tamilName: 'வாழை தண்டு துளைப்பான் வண்டு',
        symptoms: 'Pinhead bore holes on pseudostem exuding transparent gummy gelatinous sap; rotting decayed stem collapsing under wind.',
        tamilSymptoms: 'வாழை தண்டில் ஊசி முனை துளைகள் மற்றும் பிசின் போன்ற திரவம் வடிதல்; பலத்த காற்றில் மரம் முறிந்து விழுதல்.',
        causes: 'Odoiporus longicollis weevil grubs excavating extensive internal tunnels inside pseudostem sheath.',
        tamilCauses: 'தண்டு கூன்வண்டின் புழுக்கள் தண்டின் உட்பகுதியை குடைந்து உண்பதால் தண்டு பலவீனமடைவது.',
        chemicalRemedy: 'Stem injection with Monocrotophos 36% SL @ 1ml in 4ml water at 5th and 7th month, or Chlorpyrifos swabbing.',
        organicRemedy: 'Install banana pseudostem longitudinal split traps smeared with Beauveria bassiana spores.',
        affectedCrops: 'Banana (வாழை)',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'stem_cotton_weevil',
        cropName: 'Cotton',
        tamilCropName: 'பருத்தி',
        name: 'Cotton Stem Weevil (Pempherulus affinis)',
        tamilName: 'பருத்தி தண்டு கூன்வண்டு & வீக்கம்',
        symptoms: 'Gall-like nodular swelling at collar region of stem just above ground line; young plants snap off in light wind.',
        tamilSymptoms: 'தரைமட்ட தண்டின் அடிப்பகுதியில் முடிச்சு போன்ற வீக்கம் ஏற்படுதல்; பயிர் லேசான காற்றில் முறிந்து விழுதல்.',
        causes: 'Pempherulus affinis grubs tunneling deep into cambium rings causing structural weakness.',
        tamilCauses: 'தண்டு கூன்வண்டின் புழுக்கள் தண்டின் அடி மரப்பட்டையை குடைந்து சேதப்படுத்துவது.',
        chemicalRemedy: 'Soil drenching around stem base with Chlorpyrifos 20% EC @ 2.5ml/L at 20 and 35 days after sowing.',
        organicRemedy: 'Earthing up soil to cover collar region; drenching neem oil formulation @ 3ml/L.',
        affectedCrops: 'Cotton (பருத்தி)',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'stem_coconut_bleeding',
        cropName: 'Coconut',
        tamilCropName: 'தென்னை',
        name: 'Coconut Stem Bleeding Disease (Ceratocystis)',
        tamilName: 'தென்னை தண்டு வடியும் நோய்',
        symptoms: 'Exudation of dark reddish-brown sticky liquid from bark cracks on trunk (1 to 2 meters above ground); trunk decay.',
        tamilSymptoms: 'மரத்தின் தண்டு வெடிப்புகளிலிருந்து அடர் சிவப்பு/கருப்பு நிற பசை போன்ற திரவம் கசிந்து தண்டு அழுகுதல்.',
        causes: 'Thielaviopsis paradoxa fungus penetrating trunk wounds created by pruning or lightning strikes.',
        tamilCauses: 'தண்டில் ஏற்படும் வெட்டுகள் வழியாக உள்ளே புகும் பூஞ்சாண தொற்று.',
        chemicalRemedy: 'Chisel out infected bark tissue cleanly; swab with Bordeaux paste or Coal tar mixed with Carbendazim.',
        organicRemedy: 'Root feeding with 2g Carbendazim + 2g Copper Sulphate in 100ml water; apply Trichoderma to root basin.',
        affectedCrops: 'Coconut (தென்னை), Arecanut',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'stem_rose_dieback',
        cropName: 'Rose',
        tamilCropName: 'ரோஜா',
        name: 'Rose Stem Dieback & Canker',
        tamilName: 'ரோஜா தண்டு காய்வு & நுனிக்கருகல்',
        symptoms: 'Pruned stem tips blacken and dry downwards towards the crown; stem shrivels with dark sunken lesions.',
        tamilSymptoms: 'கவாத்து செய்த இடத்திலிருந்து தண்டு கீழ்நோக்கி கருப்பாகி காய்ந்து முழு கிளையுமே உலர்ந்து போதல்.',
        causes: 'Diplodia & Colletotrichum fungal spores colonizing cut surfaces without antiseptic dressing.',
        tamilCauses: 'கவாத்து செய்த தண்டு முனைகளில் மருந்து பூசாததால் பூஞ்சாணம் கீழ்நோக்கி பரவுவது.',
        chemicalRemedy: 'Prune dead stem 2 inches below blackening into healthy green wood; apply Bordeaux paste to cut ends.',
        organicRemedy: 'Disinfect pruning shears in 70% alcohol before each cut; dab turmeric-cow dung paste on cuts.',
        affectedCrops: 'Rose (ரோஜா)',
        severity: 'Medium',
        sampleImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80'
      }
    ]
  },

  // 4. ROOTS - ALL CROPS
  {
    id: 'roots',
    title: 'Roots',
    tamilTitle: 'வேர்கள் & கிழங்குகள்',
    description: 'Root rot, damping-off, nematodes, rhizome rot, and tuber decay across all agricultural species',
    tamilDescription: 'மஞ்சள் கிழங்கு அழுகல், தென்னை வேர்வாடல், தக்காளி நாற்றழுகல், உருளை கிழங்கு அழுகல் உள்ளிட்ட வேர் நோய்கள்',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80',
    commonDiseases: [
      {
        id: 'root_turmeric_rhizome_rot',
        cropName: 'Turmeric / Ginger',
        tamilCropName: 'மஞ்சள் & இஞ்சி',
        name: 'Turmeric Rhizome Rot / Soft Rot (Pythium aphanidermatum)',
        tamilName: 'மஞ்சள் கிழங்கு அழுகல் நோய்',
        symptoms: 'Collar region rots and emits foul odor, leaves turn yellow and dry from margin inward; rhizomes rot into soft brown foul mush.',
        tamilSymptoms: 'தரைமட்ட தண்டு அழுகி துர்நாற்றம் வீசுதல், இலைகள் மஞ்சள் நிறமாகி காய்வதுடன் நிலத்தடி கிழங்கு அழுகிப் போதல்.',
        causes: 'Pythium water mold thriving in waterlogged, poorly-drained ridge furrows during monsoon.',
        tamilCauses: 'மண்ணில் தண்ணீர் தேங்குவதால் ஏற்படும் பித்தியம் பூஞ்சாணம்.',
        chemicalRemedy: 'Drench ridges with Metalaxyl 35% WS @ 2g/L or Copper Oxychloride 50% WP @ 3g/L at first appearance.',
        organicRemedy: 'Rhizome treatment with Trichoderma viride @ 10g/kg; apply Neem cake @ 250 kg/acre.',
        affectedCrops: 'Turmeric (மஞ்சள்), Ginger (இஞ்சி)',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'root_coconut_wilt',
        cropName: 'Coconut',
        tamilCropName: 'தென்னை',
        name: 'Coconut Basal Stem Rot (Thanjavur Wilt / Ganoderma)',
        tamilName: 'தென்னை தஞ்சாவூர் வாடல் நோய் (கானோடெர்மா)',
        symptoms: 'Basal trunk exhibits dark brown bleeding exudation, bracket-like conks (mushrooms) emerge at trunk base; roots rot and palm wilts.',
        tamilSymptoms: 'மரத்தின் அடிப்பகுதி அழுகி பழுப்பு நிற திரவம் வடிதல், தண்டு அடியில் விசிறி வடிவ காளான் தோன்றுதல், வேர்கள் அழுகி மரம் சாய்வது.',
        causes: 'Ganoderma lucidum soil fungus attacking older roots and destroying trunk vascular system.',
        tamilCauses: 'மண்ணில் வாழும் கானோடெர்மா பூஞ்சாணம் வேர்களை தாக்கி அழிப்பது.',
        chemicalRemedy: 'Root feeding with Hexaconazole 2ml in 100ml water or Aureofungin-sol 2g + Copper Sulphate 1g in 100ml water.',
        organicRemedy: 'Apply 5kg Neem cake + 200g Trichoderma harzianum mixed with farmyard manure around root bowl.',
        affectedCrops: 'Coconut (தென்னை)',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'root_tomato_nematode',
        cropName: 'Tomato',
        tamilCropName: 'தக்காளி & கத்தரி',
        name: 'Root-Knot Nematodes (Meloidogyne incognita)',
        tamilName: 'வேர் முடிச்சு நூற்புழு நோய்',
        symptoms: 'Roots show numerous irregular bead-like knots and galls, stunted yellow foliage, daytime wilting even with damp soil.',
        tamilSymptoms: 'வேர்களில் உருண்டையான முடிச்சுகள் தோன்றுதல்; பயிர் போதிய சத்துக்களை உறிஞ்ச முடியாமல் பகல் வெயிலில் வாடுதல்.',
        causes: 'Microscopic eelworms penetrating root cells and creating giant multi-nucleate feeder knots.',
        tamilCauses: 'மண்ணில் உள்ள நூற்புழுக்கள் வேருக்குள் புகுந்து முடிச்சுகளை உருவாக்குவது.',
        chemicalRemedy: 'Apply Fluopyram 34.48% SC @ 1.5ml/L drench or Cartap Hydrochloride granules in nursery beds.',
        organicRemedy: 'Incorporate Neem cake @ 200 kg/acre; intercrop or rotate with African Marigold (சாமந்தி).',
        affectedCrops: 'Tomato, Brinjal, Chilli, Okra, Papaya',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'root_groundnut_rot',
        cropName: 'Groundnut',
        tamilCropName: 'நிலக்கடலை',
        name: 'Groundnut Collar Rot & Root Decay (Aspergillus niger)',
        tamilName: 'நிலக்கடலை வேர்க்கழுத்து அழுகல் நோய்',
        symptoms: 'Seedlings rot at ground level, covered with powdery black spore dust; mature plants wilt suddenly with rotting taproot.',
        tamilSymptoms: 'முளைக்கும் விதைகள் மற்றும் நாற்றுகளின் கழுத்துப் பகுதியில் கருப்பு தூள் படிந்து அழுகி செடி காய்ந்து போதல்.',
        causes: 'Aspergillus niger fungal pathogen favored by high soil temperature and seed injury.',
        tamilCauses: 'அஸ்பர்ஜில்லஸ் பூஞ்சாணம் விதை முளைக்கும் போது வேரை தாக்கும்.',
        chemicalRemedy: 'Seed treatment with Mancozeb 75% WP @ 2g/kg seed or Carbendazim 2g/kg.',
        organicRemedy: 'Seed dressing with Trichoderma viride @ 4g/kg seed; ensure deep sowing in loose friable soil.',
        affectedCrops: 'Groundnut (நிலக்கடலை)',
        severity: 'Medium',
        sampleImage: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=400&auto=format&fit=crop&q=80'
      }
    ]
  },

  // 5. FRUITS - ALL CROPS
  {
    id: 'fruits',
    title: 'Fruits',
    tamilTitle: 'காய்கள் & பழங்கள்',
    description: 'Fruit borer, anthracnose ripe rot, blossom end rot, and fruit fly across all fruit & vegetable crops',
    tamilDescription: 'தக்காளி காய்ப்புழு, மாம்பழ ஈ, மிளகாய் பழ அழுகல், கத்தரி காய்ப்புழு, வாழை கரும்புள்ளி உள்ளிட்ட காய் நோய்கள்',
    imageUrl: 'https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?w=800&auto=format&fit=crop&q=80',
    commonDiseases: [
      {
        id: 'fruit_tomato_borer',
        cropName: 'Tomato',
        tamilCropName: 'தக்காளி',
        name: 'Tomato Fruit Borer (Helicoverpa armigera)',
        tamilName: 'தக்காளி காய்ப்புழு தாக்குதல்',
        symptoms: 'Circular entrance holes bored into green & ripening tomatoes with larval head thrust inside feeding on seeds and pulp.',
        tamilSymptoms: 'காய்களில் வட்ட வடிவ துளைகள் இட்டு புழுக்கள் உள்ளே புகுந்து சதையை தின்று அழுகச் செய்தல்.',
        causes: 'Nocturnal Helicoverpa armigera moth laying spherical eggs on flower clusters.',
        tamilCauses: 'அந்துப்பூச்சியின் புழுக்கள் காய்க்குள் துளைத்து சேதப்படுத்துகின்றன.',
        chemicalRemedy: 'Spray Chlorantraniliprole 18.5% SC @ 0.3ml/L or Emamectin Benzoate 5% SG @ 0.5g/L.',
        organicRemedy: 'Install Helicoverpa pheromone traps (5/acre); spray Bacillus thuringiensis (Bt) @ 2g/L or 5% NSKE.',
        affectedCrops: 'Tomato, Okra, Chilli, Cotton, Grams',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'fruit_mango_fruit_fly',
        cropName: 'Mango',
        tamilCropName: 'மாம்பழம்',
        name: 'Mango Oriental Fruit Fly (Bactrocera dorsalis)',
        tamilName: 'மாம்பழ ஈ தாக்குதல் & புழு அழுகல்',
        symptoms: 'Punctures and liquid oozing on fruit skin, internal pulp turns brown and decays into smelly maggot-infested mush.',
        tamilSymptoms: 'பழத்தின் தோலில் ஊசி துளைகள் மற்றும் திரவம் கசிதல், உள்ளே சதை அழுகி புழுக்கள் நெளிதல்.',
        causes: 'Female Bactrocera fruit fly ovipositing eggs under the skin of maturing mangoes.',
        tamilCauses: 'பழ ஈக்கள் பழத்தின் தோலைத் துளைத்து முட்டையிடுவதால் புழுக்கள் சதையை உண்பது.',
        chemicalRemedy: 'Foliar bait spray: Malathion 50% EC 2ml + Jaggery/Molasses 10g per litre of water.',
        organicRemedy: 'Hang Methyl Eugenol pheromone traps (6 traps/acre) at canopy height 45 days before harvest.',
        affectedCrops: 'Mango (மாம்பழம்), Guava, Papaya',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'fruit_chilli_anthracnose',
        cropName: 'Chilli',
        tamilCropName: 'மிளகாய்',
        name: 'Chilli Ripe Fruit Rot / Anthracnose',
        tamilName: 'மிளகாய் பழ அழுகல் நோய்',
        symptoms: 'Circular, sunken black lesions with concentric rings of salmon-pink fungal spore masses on red ripe pods.',
        tamilSymptoms: 'பழுத்த மிளகாய் காய்களின் மேல் குழிவான புள்ளிகள் தோன்றி இளஞ்சிவப்பு நிற பூஞ்சாணத் துகள்கள் படர்தல்.',
        causes: 'Colletotrichum capsici fungal pathogen surviving on infected seed and dry crop residues.',
        tamilCauses: 'மழைநீர் தெறித்தல் மூலம் பரவும் கொலிட்டோட்ரைகம் பூஞ்சாணம்.',
        chemicalRemedy: 'Spray Difenoconazole 25% EC @ 1ml/L or Tebuconazole + Trifloxystrobin @ 0.5g/L.',
        organicRemedy: 'Harvest pods promptly when red ripe; destroy mummified pods; spray Trichoderma viride 10g/L.',
        affectedCrops: 'Chilli (மிளகாய்), Capsicum',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'fruit_brinjal_borer',
        cropName: 'Brinjal',
        tamilCropName: 'கத்தரிக்காய்',
        name: 'Brinjal Shoot & Fruit Borer (Leucinodes orbonalis)',
        tamilName: 'கத்தரி காய்ப்புழு & குருத்து துளைப்பான்',
        symptoms: 'Exit holes on brinjal fruits plugged with wet excreta, interior pulp rots and fruit becomes completely unmarketable.',
        tamilSymptoms: 'காய்களில் புழுக்கள் நுழைந்து துளை வழியே கழிவுகளை வெளியேற்றி காயை அழுகச் செய்தல்.',
        causes: 'Leucinodes orbonalis caterpillar entering young tender fruits and developing inside.',
        tamilCauses: 'காய்ப்புழுவின் இளம் புழுக்கள் காய்க்குள் புகுந்து சேதப்படுத்துவது.',
        chemicalRemedy: 'Spray Emamectin Benzoate 5% SG @ 0.4g/L or Spinosad 45% SC @ 0.3ml/L.',
        organicRemedy: 'Install Leucinodes pheromone traps (12/acre); collect and destroy all bore fruits weekly.',
        affectedCrops: 'Brinjal (கத்தரி)',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'fruit_banana_anthracnose',
        cropName: 'Banana',
        tamilCropName: 'வாழைக்காய் & பழம்',
        name: 'Banana Anthracnose Finger Rot',
        tamilName: 'வாழைக்காய் கரும்புள்ளி அழுகல் நோய்',
        symptoms: 'Small circular black diamond spots on banana fingers that coalesce into sunken rot as fruit ripens.',
        tamilSymptoms: 'வாழை காய்கள் மற்றும் பழங்களின் மேல் கருப்பு புள்ளிகள் தோன்றி பழம் விரைவில் அழுகி கெட்டுப்போதல்.',
        causes: 'Colletotrichum musae fungus attacking peel micro-abrasions during humid shipping and storage.',
        tamilCauses: 'அறுவடை காய்களில் ஏற்படும் உராய்வுகள் வழியாக பூஞ்சாணம் பரவுதல்.',
        chemicalRemedy: 'Post-harvest dip in Carbendazim 0.1% or pre-harvest bunch spray with Mancozeb @ 2g/L.',
        organicRemedy: 'Bag bunches with ventilated polythene covers; handle harvested bunches with clean foam padding.',
        affectedCrops: 'Banana (வாழை)',
        severity: 'Medium',
        sampleImage: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80'
      }
    ]
  },

  // 6. WHOLE PLANT - ALL CROPS
  {
    id: 'whole_plant',
    title: 'Whole Plant',
    tamilTitle: 'முழு செடி / பயிர்',
    description: 'Vascular wilts, systemic viruses, collapse, and complete nutrient starvation across all species',
    tamilDescription: 'பனாமா வாடல், துங்ரோ மஞ்சள் நோய், புல் குருத்து, செடி முழுவதும் திடீர் வாடல் நோய்கள்',
    imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&auto=format&fit=crop&q=80',
    commonDiseases: [
      {
        id: 'whole_banana_panama',
        cropName: 'Banana',
        tamilCropName: 'வாழை',
        name: 'Panama Wilt (Fusarium oxysporum f. sp. cubense)',
        tamilName: 'வாழை பனாமா வாடல் நோய்',
        symptoms: 'Yellowing of lower leaves around petiole, leaves collapse at pseudostem forming skirt around trunk, vascular xylem shows reddish-brown streaks.',
        tamilSymptoms: 'அடி இலைகள் மஞ்சள் நிறமாகி மட்டையோடு முறிந்து தண்டோடு தொங்குதல்; தண்டை பிளந்தால் சிவப்பு நரம்புகள் இருத்தல்.',
        causes: 'Fusarium soil pathogen invading vascular xylem vessels through roots and cutting off water supply.',
        tamilCauses: 'வேர் வழியாக தண்டுக்குள் புகுந்து நீர் செல்லும் நாளங்களை அடைக்கும் பூஞ்சாணம்.',
        chemicalRemedy: 'Capsule application with 50mg Carbendazim into corm or corm injection with 2% Carbendazim.',
        organicRemedy: 'Soil application of Trichoderma viride enriched FYM @ 5kg/pit; grow resistant Grand Naine variety.',
        affectedCrops: 'Banana (வாழை - ரஸ்தாளி, பூவன், நேந்திரன்)',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'whole_tomato_fusarium',
        cropName: 'Tomato',
        tamilCropName: 'தக்காளி',
        name: 'Vascular Fusarium Wilt (Fusarium oxysporum)',
        tamilName: 'தக்காளி வாடல் நோய்',
        symptoms: 'One side of plant turns yellow first, leaves drop, entire plant wilts rapidly during midday heat and fails to recover.',
        tamilSymptoms: 'செடியின் ஒரு பகுதி இலைகள் மட்டும் மஞ்சள் நிறமாகி வாடுதல், பின்னர் முழு செடியும் தலைசாய்ந்து காய்ந்து போதல்.',
        causes: 'Soil-borne fungal pathogen surviving in soil for up to 10 years without host.',
        tamilCauses: 'மண்ணில் பல ஆண்டுகள் வாழும் பியூசாரியம் பூஞ்சாணம் வேர் வழியே ஊடுருவுதல்.',
        chemicalRemedy: 'Soil drenching around root zone with Carbendazim @ 1g/L or Benomyl @ 1g/L.',
        organicRemedy: 'Soil solarization in peak summer; drench Pseudomonas fluorescens @ 10g/L + Trichoderma.',
        affectedCrops: 'Tomato, Chilli, Brinjal, Cotton',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&auto=format&fit=crop&q=80'
      },
      {
        id: 'whole_rice_tungro',
        cropName: 'Paddy / Rice',
        tamilCropName: 'நெல்',
        name: 'Rice Tungro Virus Disease (RTV)',
        tamilName: 'நெல் துங்ரோ நச்சுயிரி மஞ்சள் நோய்',
        symptoms: 'Stunted plant growth, leaves turn bright orange-yellow starting from tips, reduced tillering, delayed flowering with sterile grains.',
        tamilSymptoms: 'பயிர் வளர்ச்சி குன்றி குட்டையாதல், இலை நுனிகள் ஆரஞ்சு-மஞ்சள் நிறமாக மாறுதல், தூர்கள் குறையுதல்.',
        causes: 'Rice Tungro Bacilliform Virus transmitted by Green Leafhopper (Nephotettix virescens).',
        tamilCauses: 'பச்சை தத்துப்பூச்சிகள் மூலம் பயிருக்கு வைரஸ் கிருமி பரவுதல்.',
        chemicalRemedy: 'Spray Thiamethoxam 25% WG @ 0.4g/L or Dinotefuran 20% SG @ 0.4g/L to control hopper vector.',
        organicRemedy: 'Install light traps to catch nocturnal green leafhoppers; spray 5% Neem seed kernel extract.',
        affectedCrops: 'Paddy / Rice (நெல்)',
        severity: 'High',
        sampleImage: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=400&auto=format&fit=crop&q=80'
      }
    ]
  }
];

export const ChooseAffectedPartView: React.FC<ChooseAffectedPartViewProps> = ({
  currentLanguage,
  onBack,
  onStartAnalysisWithPart
}) => {
  const [selectedPartId, setSelectedPartId] = useState<string>('flower');
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('ALL');
  const [diseaseSearch, setDiseaseSearch] = useState('');

  const selectedPart = useMemo(() => {
    return AFFECTED_PARTS_DATA.find((p) => p.id === selectedPartId) || AFFECTED_PARTS_DATA[0];
  }, [selectedPartId]);

  // Extract unique crop names for the selected part
  const availableCropsForPart = useMemo(() => {
    const set = new Set<string>();
    selectedPart.commonDiseases.forEach(d => set.add(d.cropName));
    return Array.from(set);
  }, [selectedPart]);

  // Filter diseases by crop and search
  const filteredDiseases = useMemo(() => {
    return selectedPart.commonDiseases.filter((d) => {
      // Crop filter
      if (selectedCropFilter !== 'ALL' && d.cropName !== selectedCropFilter) {
        return false;
      }
      // Search filter
      const q = diseaseSearch.toLowerCase().trim();
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        d.tamilName.includes(q) ||
        d.cropName.toLowerCase().includes(q) ||
        d.tamilCropName.includes(q) ||
        d.symptoms.toLowerCase().includes(q) ||
        d.tamilSymptoms.includes(q)
      );
    });
  }, [selectedPart, selectedCropFilter, diseaseSearch]);

  return (
    <div className="min-h-screen bg-white text-stone-900 pb-28 animate-in fade-in duration-200">
      
      {/* Top Header Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-purple-100 px-4 py-3 flex items-center justify-between shadow-2xs">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-purple-50 hover:bg-purple-100 text-[#8b5cf6] flex items-center justify-center transition-colors cursor-pointer active:scale-95"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="text-center">
          <span className="text-[11px] font-extrabold text-[#8b5cf6] uppercase tracking-wider block">
            {currentLanguage === 'ta' ? 'AI நோய் பரிசோதனை' : 'AI Pathology & Diagnosis'}
          </span>
          <h2 className="text-base font-black text-stone-900">
            {currentLanguage === 'ta' ? 'பாதிக்கப்பட்ட பாகத்தைத் தேர்ந்தெடுக்கவும்' : 'Choose Affected Plant Part'}
          </h2>
        </div>

        <div className="w-10" />
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-4 space-y-5">
        
        {/* Part Selection Carousel / Tabs */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
            {currentLanguage === 'ta' ? 'பயிரின் பாதிக்கப்பட்ட பாகம்:' : 'Select Affected Part:'}
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {AFFECTED_PARTS_DATA.map((part) => {
              const isSelected = selectedPartId === part.id;
              return (
                <button
                  key={part.id}
                  onClick={() => {
                    setSelectedPartId(part.id);
                    setSelectedCropFilter('ALL');
                    setDiseaseSearch('');
                  }}
                  className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1.5 ${
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/25 scale-102 font-black'
                      : 'bg-stone-50 hover:bg-purple-50/50 text-stone-700 border-stone-200/80 hover:border-purple-300 font-bold'
                  }`}
                >
                  <span className="text-lg">
                    {part.id === 'flower' ? '🌸' : part.id === 'leaves' ? '🍃' : part.id === 'stem' ? '🎋' : part.id === 'roots' ? '🥕' : part.id === 'fruits' ? '🍅' : '🪴'}
                  </span>
                  <span className="text-xs truncate w-full">
                    {currentLanguage === 'ta' ? part.tamilTitle.split(' ')[0] : part.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Part Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-purple-100 h-40 sm:h-48 flex items-end p-5 text-white">
          <img
            src={selectedPart.imageUrl}
            alt={selectedPart.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          <div className="relative z-10 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#8b5cf6] text-white text-[10px] font-extrabold uppercase tracking-wider">
                {selectedPart.commonDiseases.length} Crops & Diseases Documented
              </span>
            </div>
            <h1 className="text-2xl font-black text-white">
              {currentLanguage === 'ta' ? `${selectedPart.tamilTitle} நோய்கள்` : `${selectedPart.title} Diseases`}
            </h1>
            <p className="text-xs text-white/90">
              {currentLanguage === 'ta' ? selectedPart.tamilDescription : selectedPart.description}
            </p>
          </div>
        </div>

        {/* Camera / Upload Callout for this Part */}
        <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-purple-50 p-4 rounded-2xl border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div>
            <h3 className="text-xs font-black text-purple-950 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
              <span>
                {currentLanguage === 'ta'
                  ? `உங்கள் செடியின் ${selectedPart.tamilTitle} படம் எடுத்து AI மூலம் சோதிக்க:`
                  : `Have an affected plant photo? Diagnose instantly with AI:`}
              </span>
            </h3>
            <p className="text-[11px] text-purple-900/80 mt-0.5">
              {currentLanguage === 'ta'
                ? 'புகைப்படம் எடுத்தால் AI பயிரைக் கண்டறிந்து துல்லியமான மருந்து மற்றும் இயற்கை முறையை பரிந்துரைக்கும்.'
                : 'Upload or take a photo to detect precise pathogen, severity, chemical and organic remedy.'}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => onStartAnalysisWithPart(selectedPart.id, 'camera')}
              className="px-4 py-2.5 rounded-xl bg-[#8b5cf6] hover:bg-purple-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-purple-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>{currentLanguage === 'ta' ? 'கேமரா ஸ்கேன்' : 'Live Camera'}</span>
            </button>
            <button
              onClick={() => onStartAnalysisWithPart(selectedPart.id, 'upload')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-purple-50 text-[#8b5cf6] border border-purple-300 font-bold text-xs flex items-center space-x-1.5 shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>{currentLanguage === 'ta' ? 'புகைப்படம் பதிவேற்று' : 'Upload Photo'}</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Crop Filter Pills for ALL Plants */}
        <div className="space-y-3">
          
          <div className="relative">
            <Search className="w-4 h-4 text-purple-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={diseaseSearch}
              onChange={(e) => setDiseaseSearch(e.target.value)}
              placeholder={currentLanguage === 'ta' ? "பயிர் பெயர் அல்லது நோய் பெயர் கொண்டு தேடுங்கள்..." : "Search by crop (Rose, Jasmine, Tomato, Paddy...) or disease name..."}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-purple-200 rounded-2xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500 shadow-2xs font-semibold"
            />
          </div>

          {/* Crop Selector Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCropFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                selectedCropFilter === 'ALL'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-purple-400'
              }`}
            >
              {currentLanguage === 'ta' ? `அனைத்துப் பயிர்கள் (${selectedPart.commonDiseases.length})` : `All Crops (${selectedPart.commonDiseases.length})`}
            </button>

            {availableCropsForPart.map((cropName) => (
              <button
                key={cropName}
                onClick={() => setSelectedCropFilter(cropName)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCropFilter === cropName
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-purple-400'
                }`}
              >
                {cropName}
              </button>
            ))}
          </div>

        </div>

        {/* Diseases List Across All Flowers / Plants */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-stone-900 flex items-center space-x-1.5">
              <span>{currentLanguage === 'ta' ? 'கண்டறியப்பட்ட பொதுவான நோய்கள்' : 'Documented Plant Diseases:'}</span>
              <span className="text-xs bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                {filteredDiseases.length}
              </span>
            </h3>
          </div>

          {filteredDiseases.length === 0 ? (
            <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <p className="text-xs font-bold text-stone-600">No diseases found matching "{diseaseSearch}".</p>
              <button
                onClick={() => { setDiseaseSearch(''); setSelectedCropFilter('ALL'); }}
                className="text-xs font-black text-purple-600 underline"
              >
                Clear Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDiseases.map((d) => (
                <div
                  key={d.id}
                  className="bg-white rounded-3xl border border-purple-100/90 hover:border-purple-400 p-4 shadow-sm hover:shadow-md transition-all space-y-3.5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    
                    {/* Header Image & Severity Badge */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-100">
                      <img
                        src={d.sampleImage}
                        alt={d.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-black shadow-xs">
                          {d.cropName} ({d.tamilCropName})
                        </span>
                      </div>

                      <div className="absolute top-2.5 right-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase text-white shadow-xs ${
                          d.severity === 'High' ? 'bg-rose-600' : 'bg-amber-600'
                        }`}>
                          {d.severity} Severity
                        </span>
                      </div>
                    </div>

                    {/* Title & Tamil Name */}
                    <div>
                      <h4 className="text-sm font-black text-stone-900">
                        {currentLanguage === 'ta' ? d.tamilName : d.name}
                      </h4>
                      <p className="text-[11px] font-bold text-purple-600">
                        {currentLanguage === 'ta' ? d.name : d.tamilName}
                      </p>
                    </div>

                    {/* Symptoms */}
                    <div className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xs space-y-1">
                      <span className="font-extrabold text-purple-900 block text-[11px]">
                        🔍 {currentLanguage === 'ta' ? 'அறிகுறிகள் (Symptoms):' : 'Symptoms:'}
                      </span>
                      <p className="text-stone-700 leading-snug">
                        {currentLanguage === 'ta' ? d.tamilSymptoms : d.symptoms}
                      </p>
                    </div>

                    {/* Causes */}
                    <div className="text-[11px] text-stone-600">
                      <strong>⚠️ {currentLanguage === 'ta' ? 'காரணம்:' : 'Cause:'} </strong>
                      {currentLanguage === 'ta' ? d.tamilCauses : d.causes}
                    </div>

                    {/* Remedies */}
                    <div className="space-y-1.5 pt-1 text-[11px]">
                      <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-900">
                        <strong>🌿 {currentLanguage === 'ta' ? 'இயற்கை தீர்வு:' : 'Organic Control:'} </strong>
                        {d.organicRemedy}
                      </div>

                      <div className="p-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-900">
                        <strong>🧪 {currentLanguage === 'ta' ? 'மருந்து தெளிப்பு அளவு:' : 'Chemical Remedy:'} </strong>
                        {d.chemicalRemedy}
                      </div>
                    </div>

                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onStartAnalysisWithPart(selectedPart.id, 'camera')}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs flex items-center justify-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{currentLanguage === 'ta' ? 'இச்செடியை படம் எடுத்து பரிசோதிக்க' : 'Scan & Test This Plant with AI'}</span>
                  </button>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
