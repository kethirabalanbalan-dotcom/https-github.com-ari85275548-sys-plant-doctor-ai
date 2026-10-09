import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Sprout, 
  Droplets, 
  Sun, 
  FlaskConical, 
  Bug, 
  Search, 
  ShieldAlert,
  Wind,
  Scissors,
  CheckCircle2,
  Thermometer,
  Layers,
  Wrench,
  Camera,
  Play,
  X,
  Sparkles,
  AlertTriangle,
  Leaf,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Heart,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { PLANT_GUIDES, PlantGuideItem } from '../utils/plantGuideData';

interface LibraryViewProps {
  currentLanguage: Language;
  onSelectPlantToAnalyze: (plantName: string) => void;
}

export interface CropDetailedGuide {
  growthTimeline: string;
  sowingSeason: string;
  wateringSchedule: string;
  fertilizerDose: string;
  topDiseases: { name: string; symptoms: string; remedy: string }[];
  yieldSecrets: string;
  petSafety: boolean;
  idealSoil: string;
  sunlightNeeds: string;
}

export interface CropVideoItem {
  id: string;
  cropName: string;
  tamilCropName: string;
  titleTa: string;
  titleEn: string;
  descriptionTa: string;
  duration: string;
  instructor: string;
  thumbnail: string;
  videoEmbedId: string;
  category: 'Cereal' | 'Vegetable' | 'Fruit' | 'Flower' | 'Commercial' | 'Spice';
  details: CropDetailedGuide;
}

export const CROP_VIDEOS: CropVideoItem[] = [
  {
    id: 'vid_paddy',
    cropName: 'Paddy / Rice',
    tamilCropName: 'நெல்',
    titleTa: 'நெல் சாகுபடி, உழவு & குலை நோய் முழு மேலாண்மை',
    titleEn: 'Complete Rice Farming & Blast Disease Management Guide',
    descriptionTa: 'நாற்று நடுதல் முதல் கதிர் அறுவடை வரை நீர் மேலாண்மை, அடி உரம் மற்றும் குலை நோய் தீர்வு.',
    duration: '14:20',
    instructor: 'தமிழ்நாடு வேளாண்மை பல்கலைக்கழகம் (TNAU)',
    thumbnail: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=800&auto=format&fit=crop&q=80',
    videoEmbedId: '7Q3wA5Pz8d8',
    category: 'Cereal',
    details: {
      growthTimeline: '115 - 130 நாட்கள் (நாற்று: 20-25 நாள், தூர் கட்டுதல்: 30-50 நாள், கதிர் உருவாதல்: 65-80 நாள், பால் பருவம்: 85-95 நாள், முதிர்வு: 105-120 நாள்).',
      sowingSeason: 'குறுவை (ஜூன் - ஜூலை), சம்பா (ஆகஸ்ட் - செப்டம்பர்), நவரை (டிசம்பர் - ஜனவரி).',
      wateringSchedule: 'நட்ட 7 நாட்கள் வரை 2 செ.மீ நீர்; தூர் கட்டும் போது 5 செ.மீ நீர்; கதிர் முதிர்ச்சிக்கு 10 நாள் முன் நீரை முழுமையாக வடிக்கவும்.',
      fertilizerDose: 'அடி உரமாக DAP 50 கிலோ + பொட்டாஷ் 25 கிலோ; யூரியா 60 கிலோவை 3 தவணைகளாக (15, 30, 45 ஆம் நாள்) இடவும்.',
      topDiseases: [
        { name: 'குலை நோய் (Rice Blast)', symptoms: 'இலைகளில் கண் வடிவ கரும்பழுப்பு புள்ளிகள் தோன்றி இலைகள் கருகும்.', remedy: 'டிரைசைக்ளோசோல் 75% WP @ 0.6 கிராம்/லிட்டர் தெளிக்கவும்.' },
        { name: 'தண்டுத்துளைப்பான் (Stem Borer)', symptoms: 'நடுக்குருத்து காய்ந்து வெண்கதிர் தோன்றும்.', remedy: 'கார்டாப் ஹைட்ரோகுளோரைடு குருணை உரம் இடவும் அல்லது குளோரான்ட்ரனிலிப்ரோல் தெளிக்கவும்.' },
        { name: 'பாக்டீரியா இலைக்கருகல் (BLB)', symptoms: 'இலை விளிம்புகள் அலை அலையாக மஞ்சள்-வெள்ளையாக காய்ந்து வரும்.', remedy: 'காப்பர் ஆக்ஸிகுளோரைடு 25 கிராம் + ஸ்ட்ரெப்டோமைசின் 1 கிராம் தெளிக்கவும்.' }
      ],
      yieldSecrets: 'தூர்க்கட்டும் பருவத்தில் துத்தநாக சல்பேட் (Zinc Sulphate 10kg/acre) இடுவதால் 20% கூடுதல் மகசூல் கிடைக்கும்.',
      petSafety: true,
      idealSoil: 'நீரைத் தேக்கி வைக்கும் களிமண் மற்றும் வண்டல் மண் (pH: 6.0 - 7.0).',
      sunlightNeeds: 'முழுமையான நேரடி வெயில் (8 மணி நேரம்) கதிர் திரள மிக அவசியமானது.'
    }
  },
  {
    id: 'vid_tomato',
    cropName: 'Tomato',
    tamilCropName: 'தக்காளி',
    titleTa: 'தக்காளி இலைச்சுருட்டு & பூ உதிர்தல் முழு இயற்கை தீர்வு',
    titleEn: 'Tomato Leaf Curl & Blossom Drop Control Technique',
    descriptionTa: 'மேட்டுப்பாத்தி அமைத்தல், சொட்டு நீர் பாசனம் மற்றும் காய் துளைப்பான் புழு தடுப்பு முறைகள்.',
    duration: '12:45',
    instructor: 'உழவர் மேடை & டாக்டர் அக்ரி',
    thumbnail: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=800&auto=format&fit=crop&q=80',
    videoEmbedId: 'aYV8oR3J1uE',
    category: 'Vegetable',
    details: {
      growthTimeline: '90 - 120 நாட்கள் (நாற்று: 25 நாள், முதல் பூ: 45 நாள், முதல் அறுவடை: 70 நாள் முதல் 120 நாள் வரை தொடர் பறிப்பு).',
      sowingSeason: 'ஆண்டு முழுவதும் பயிரிடலாம்; மே-ஜூன் மற்றும் நவம்பர்-டிசம்பர் பருவம் அதிக மகசூல் தரும்.',
      wateringSchedule: 'சொட்டு நீர் மூலம் செடிக்கு தினமும் 2 முதல் 3 லிட்டர்; இலைகளில் தண்ணீர் படக்கூடாது; மாலை நேர பாசனம் வேரழுகலைத் தூண்டும்.',
      fertilizerDose: 'அடி உரமாக மண்புழு உரம் 2 டன் + DAP 60 கிலோ; காய் பிடிக்கும் போது 19-19-19 மற்றும் போரான் தெளிக்கவும்.',
      topDiseases: [
        { name: 'இலைச்சுருட்டு நச்சுயிரி (Leaf Curl)', symptoms: 'இலைகள் படகு போல் மேல்நோக்கி சுருண்டு நரம்புகள் தடிக்கும்.', remedy: 'வெள்ளை ஈக்களைக் கட்டுப்படுத்த மஞ்சள் ஒட்டும் பொறி & வேப்ப எண்ணெய் 5% தெளிக்கவும்.' },
        { name: 'காய் துளைப்பான் புழு (Fruit Borer)', symptoms: 'காய்களில் வட்ட துளைகள் இட்டு புழுக்கள் உள்ளே புகுந்து சதையை தின்னும்.', remedy: 'இமாமெக்டின் பென்சோயேட் 5% SG @ 0.5 கிராம்/லிட்டர் தெளிக்கவும்.' },
        { name: 'அடி இலைக்கருகல் (Early Blight)', symptoms: 'இலைகளில் வளைய வடிவிலான கரும்பழுப்பு புள்ளிகள் தோன்றி இலை உதிரும்.', remedy: 'மேன்கோசெப் 75% WP @ 2 கிராம்/லிட்டர் தெளிக்கவும்.' }
      ],
      yieldSecrets: 'பூக்கும் தருணத்தில் பிளனோபிக்ஸ் (Planofix 1ml/4.5L) தெளித்தால் பூ உதிர்வது நின்று காய் பிடிப்பு 35% அதிகரிக்கும்.',
      petSafety: false,
      idealSoil: 'நல்ல வடிகால் வசதியுள்ள செம்மண் வண்டல் நிலம் (pH: 6.2 - 6.8).',
      sunlightNeeds: 'தினமும் 7-8 மணி நேர வெயில் தேவை; தீவிர கோடையில் 35% பச்சை நிழல்வலை பூக்களைக் காக்கும்.'
    }
  },
  {
    id: 'vid_banana',
    cropName: 'Banana',
    tamilCropName: 'வாழை',
    titleTa: 'வாழை தார் பெருக்க பொட்டாஷ் உரம் & தண்டு வண்டு கட்டுப்பாடு',
    titleEn: 'Banana Bunch Enlargement & Weevil Control Guide',
    descriptionTa: 'வாழை மரத்திற்கு சரியான நீர் அளவு, தண்டு கூன்வண்டுக்கு பொறி வைத்தல் & சிகாடோகா தடுப்பு.',
    duration: '15:10',
    instructor: 'வாழை விவசாயிகள் சங்கம்',
    thumbnail: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&auto=format&fit=crop&q=80',
    videoEmbedId: 'dO9jK5r7kLm',
    category: 'Fruit',
    details: {
      growthTimeline: '11 - 12 மாதங்கள் (கன்று நடுதல்: 0-3 மாதம், தண்டு வளர்ச்சி: 4-7 மாதம், பூ/தார் வெளிவருதல்: 8-9 மாதம், காய் முதிர்வு: 11-12 மாதம்).',
      sowingSeason: 'ஜனவரி - பிப்ரவரி மற்றும் ஆகஸ்ட் - செப்டம்பர் மாதங்கள் நடவு செய்ய சிறந்த பருவம்.',
      wateringSchedule: 'மரம் ஒன்றுக்கு தினமும் 15 முதல் 20 லிட்டர் சொட்டு நீர் தேவை; தார் வெளிவரும் போது நீர் வறட்சி கூடவே கூடாது.',
      fertilizerDose: '2, 4, 6 மற்றும் 8 ஆம் மாதங்களில் பிரித்து மரம் ஒன்றுக்கு 200 கிராம் யூரியா + 300 கிராம் பொட்டாஷ் இடவும்.',
      topDiseases: [
        { name: 'தண்டு துளைப்பான் வண்டு (Weevil)', symptoms: 'தண்டில் ஊசி முனை துளைகள் மற்றும் பிசின் போன்ற திரவம் கசியும்.', remedy: 'வாழை மர தண்டு ஊசி மூலம் மோனோகுரோட்டோபாஸ் செலுத்துதல் அல்லது பிளவு பொறிகள் வைத்தல்.' },
        { name: 'சிகாடோகா இலைப்புள்ளி (Sigatoka)', symptoms: 'இலைகளில் நரம்புகளுக்கு இணையாக பழுப்பு கோடுகள் தோன்றி இலை காய்ந்து தொங்கும்.', remedy: 'புரோபிகோனசோல் 1 மிலி/லிட்டர் + மினரல் ஆயில் கலந்து தெளிக்கவும்.' },
        { name: 'பனாமா வாடல் (Panama Wilt)', symptoms: 'அடி இலைகள் மஞ்சள் நிறமாகி முறிந்து தண்டோடு தொங்கும்; தண்டு உட்புறம் சிவப்பாகும்.', remedy: 'கன்று நேர்த்தி செய்து நடுதல்; டிரைக்கோடெர்மா விரிடி இடவும்.' }
      ],
      yieldSecrets: 'கடைசி சீப்பு விரிந்தவுடன் வாழைப்பூவின் நுனியை ஒடித்துவிட்டு, தாரை நீல பாலித்தீன் பையால் மூடினால் 20% எடை கூடும்.',
      petSafety: true,
      idealSoil: 'ஆழமான வண்டல் மண் அல்லது செம்மண்; 1 மீட்டர் ஆழத்திற்கு வேர் செல்ல வடிகால் தேவை.',
      sunlightNeeds: 'முழுமையான சூரிய ஒளி; பலத்த காற்றிலிருந்து காப்பாற்ற முட்டுக்கொம்புகள் ஊன்றவும்.'
    }
  },
  {
    id: 'vid_coconut',
    cropName: 'Coconut',
    tamilCropName: 'தென்னை',
    titleTa: 'தென்னை பொத்தான் உதிர்தல் தீர்வு & காண்டாமிருக வண்டு மேலாண்மை',
    titleEn: 'Coconut Button Shedding & Beetle Trap Technology',
    descriptionTa: 'மட்டை மூடாக்கு போடுதல், வேர் மூலம் டானிக் செலுத்துதல் மற்றும் பாளை அழுகல் மேலாண்மை.',
    duration: '16:30',
    instructor: 'தென்னை ஆராய்ச்சி நிலையம் (வேப்பங்குளம்)',
    thumbnail: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80',
    videoEmbedId: 'xP4wY6M8z1o',
    category: 'Fruit',
    details: {
      growthTimeline: 'ஆண்டு முழுவதும் மகசூல் தரும் நிலைப்பயிர்; நட்ட 4-5 ஆண்டுகளில் காய்க்கத் தொடங்கும்; 60 ஆண்டுகள் வரை பலன் தரும்.',
      sowingSeason: 'ஜூன் - ஜூலை (தென்மேற்கு பருவமழை) மற்றும் அக்டோபர் - நவம்பர் (வடகிழக்கு பருவமழை).',
      wateringSchedule: 'மரம் ஒன்றுக்கு தினமும் 60 முதல் 80 லிட்டர் சொட்டு நீர்; மட்டை மற்றும் தென்னை நார் மூடாக்கு ஈரத்தை காக்கும்.',
      fertilizerDose: 'மரம் ஒன்றுக்கு ஆண்டுக்கு 50 கிலோ மக்கிய தொழுவுரம் + 1.3 கிலோ யூரியா + 2 கிலோ சூப்பர் பாஸ்பேட் + 2 கிலோ பொட்டாஷ்.',
      topDiseases: [
        { name: 'பொத்தான் உதிர்தல் (Button Fall)', symptoms: 'பாளை வெடித்த பின் பிஞ்சுகள் பெருமளவில் உதிர்ந்து காய்கள் பிடிக்காமல் போகும்.', remedy: 'TNAU தென்னை டானிக் 200 மிலி வேர் மூலம் செலுத்துதல் அல்லது போராக்ஸ் 2 கிராம்/லி தெளிக்கவும்.' },
        { name: 'காண்டாமிருக வண்டு (Rhinoceros Beetle)', symptoms: 'மட்டைகளின் நடுக்குருத்து V வடிவில் கத்தரித்து இருக்கும்.', remedy: 'குருத்து இடுக்குகளில் மணல் + வேப்பம் புண்ணாக்கு கலவை வைத்தல்; ரைனோலூயர் இனக்கவர்ச்சி பொறி.' },
        { name: 'தஞ்சாவூர் வாடல் (Ganoderma Wilt)', symptoms: 'தண்டு அடியில் பழுப்பு திரவம் வடிதல்; மரத்தின் கீழ் விசிறி காளான் தோன்றுதல்.', remedy: 'ஹெக்சாகோனசோல் 2 மிலி வேர் மூலம் செலுத்துதல்; மரத்திற்கு 5 கிலோ வேப்பம் புண்ணாக்கு இடவும்.' }
      ],
      yieldSecrets: 'மரம் ஒன்றுக்கு ஆண்டுக்கு 1 கிலோ மெக்னீசியம் சல்பேட் மற்றும் 2 கிலோ பொது உப்பு (Common Salt) இட்டால் தேங்காய் பருப்பு தடிமனாகும்.',
      petSafety: true,
      idealSoil: 'மணல் கலந்த செம்மண் அல்லது கடற்கரை ஓர வண்டல் மண் (pH: 5.5 - 8.0).',
      sunlightNeeds: 'முழுமையான வெப்பமண்டல சூரிய ஒளி பாளைகள் அதிகம் வெடிக்க மிக அவசியம்.'
    }
  },
  {
    id: 'vid_jasmine',
    cropName: 'Jasmine',
    tamilCropName: 'குண்டு மல்லிகை',
    titleTa: 'மல்லிகை பூ மகசூல் இரட்டிப்பாகும் கவாத்து & மொட்டுப்புழு தீர்வு',
    titleEn: 'Jasmine Pruning Technique & Bud Worm Spray Schedule',
    descriptionTa: 'நீர் நிறுத்தம் செய்யும் முறை, கவாத்து மற்றும் இலைப்பேன் வராமல் பூக்கள் அதிகம் பூக்கும் ரகசியம்.',
    duration: '11:50',
    instructor: 'மதுரை மல்லி மலர் விவசாயிகள் சங்கம்',
    thumbnail: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&auto=format&fit=crop&q=80',
    videoEmbedId: 'uK7wZ9x2mLq',
    category: 'Flower',
    details: {
      growthTimeline: 'பல பருவ மலர்ச்செடி; நவம்பர்-டிசம்பரில் கவாத்து; பிப்ரவரி முதல் ஆகஸ்ட் வரை உச்சக்கட்ட மலர் மகசூல்.',
      sowingSeason: 'ஜூன் முதல் நவம்பர் வரை புதிய பதியன் அல்லது வேர்விட்ட குச்சிகளை நடவு செய்யலாம்.',
      wateringSchedule: 'கவாத்து செய்வதற்கு முன் 15 நாட்கள் நீர் நிறுத்தம் செய்ய வேண்டும்; கவாத்திற்கு பின் வாரம் இருமுறை பாசனம்.',
      fertilizerDose: 'செடி ஒன்றுக்கு 10 கிலோ தொழுவுரம் + 100 கிராம் NPK கலவை உரம்; 15 நாட்களுக்கு ஒருமுறை பஞ்சகாவ்யா தெளிக்கவும்.',
      topDiseases: [
        { name: 'மொட்டுப் புழு (Jasmine Bud Worm)', symptoms: 'மல்லிகை மொட்டுகள் ஊதா நிறமாகி உதிரும்; மொட்டின் அடியில் துளை இருக்கும்.', remedy: 'குளோரான்ட்ரனிலிப்ரோல் 0.3 மிலி அல்லது தையமெத்தாக்சம் 0.5 கிராம் தெளிக்கவும்.' },
        { name: 'பூ இலைப்பேன் (Flower Thrips)', symptoms: 'பூவின் இதழ் விளிம்புகள் தீய்ந்து பழுப்பு நிறமாகும்; மொட்டுகள் மலராது.', remedy: 'பிப்ரோனில் 1.5 மிலி/லிட்டர் அல்லது 5% வேப்பங்கொட்டை கரைசல் தெளிக்கவும்.' },
        { name: 'செம்பேன் (Red Spider Mite)', symptoms: 'இலைகள் வெளிறிப் போய் இலையின் கீழ் வலை பின்னி இருக்கும்.', remedy: 'ஸ்பைரோமெசிபென் 1 மிலி/லிட்டர் தெளிக்கவும்.' }
      ],
      yieldSecrets: 'கவாத்து செய்த 10-வது நாளில் செடிக்கு கடலை புண்ணாக்கு கரைசல் ஊற்றினால் மொட்டுகள் திரட்சியாக உருண்டையாக மலரும்.',
      petSafety: true,
      idealSoil: 'நல்ல வடிகால் வசதியுள்ள செம்மண் நிலங்கள் மல்லிகைக்கு மிகச்சிறந்தது.',
      sunlightNeeds: 'முழுமையான நேரடி வெயில் (7 மணி நேரம்) இருந்தால்தான் வாசனை நிறைந்த மொட்டுகள் அதிகம் தோன்றும்.'
    }
  },
  {
    id: 'vid_rose',
    cropName: 'Rose',
    tamilCropName: 'ரோஜா',
    titleTa: 'ரோஜா செடி பராமரிப்பு & கொத்து கொத்தாக பூக்கள் பூக்க எளிய உரம்',
    titleEn: 'Rose Plant Care & Abundant Blooming Organic Fertilizer',
    descriptionTa: 'கவாத்து செய்யும் கோணம், தண்டு காய்வு தடுப்பு மற்றும் மண்புழு உரம் இடும் சரியான முறை.',
    duration: '10:15',
    instructor: 'மாடித்தோட்டம் & மலர் வளர்ப்பு மையம்',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    videoEmbedId: 'rN5qY8z1mK4',
    category: 'Flower',
    details: {
      growthTimeline: 'ஆண்டு முழுவதும் பூக்கும்; கவாத்து செய்த 35-45 நாட்களில் புதிய தளிர்களில் பிரம்மாண்ட மலர்கள் பூக்கும்.',
      sowingSeason: 'அக்டோபர் - நவம்பர் மாதங்களில் கவாத்து செய்யவும்; ஜூலை-ஆகஸ்டில் புதிய செடிகள் நடலாம்.',
      wateringSchedule: 'காலையில் வேர்ப்பகுதியில் மட்டும் தண்ணீர் ஊற்றவும்; மாலையில் இலைகளில் தண்ணீர் படக்கூடாது (பூஞ்சாணம் வரும்).',
      fertilizerDose: 'மாதம் ஒருமுறை தொட்டிக்கு 2 கைப்பிடி மண்புழு உரம் + 1 ஸ்பூன் எலும்புத்தூள் + 1 ஸ்பூன் வேப்பம் புண்ணாக்கு.',
      topDiseases: [
        { name: 'தண்டு காய்வு நோய் (Dieback)', symptoms: 'கவாத்து செய்த இடத்திலிருந்து தண்டு கீழ்நோக்கி கருப்பாகி காய்ந்து வரும்.', remedy: 'கவாத்து செய்த உடனே முனைகளில் போர்டோ பேஸ்ட் அல்லது மஞ்சள் பொடி தடவவும்.' },
        { name: 'கருப்பு இலைப்புள்ளி (Black Spot)', symptoms: 'இலைகளில் வட்ட வடிவ கருப்பு புள்ளிகள் தோன்றி இலைகள் மஞ்சள் நிறமாகி உதிரும்.', remedy: 'சாஃப் (SAAF - கார்பென்டாசிம் + மேன்கோசெப்) 2 கிராம்/லிட்டர் தெளிக்கவும்.' },
        { name: 'சாம்பல் நோய் (Powdery Mildew)', symptoms: 'இளம் இலைகள் மற்றும் மொட்டுகளில் வெள்ளை மாவு போன்ற பூஞ்சாணம் படரும்.', remedy: 'புளித்த மோர் கரைசல் (1:10) அல்லது நனையும் கந்தகம் தெளிக்கவும்.' }
      ],
      yieldSecrets: 'காய்ந்த பூக்களை உடனுக்குடன் 45 டிகிரி கோணத்தில் 5-இலை கணுவிற்கு மேல் கத்தரித்தால் 3 புதிய கிளைகள் தோன்றி பூக்கும்.',
      petSafety: true,
      idealSoil: 'செம்மண் 40% + மண்புழு உரம் 35% + தென்னை நார் 15% + மணல் 10% கலவை.',
      sunlightNeeds: 'காலை நேர 6 மணி நேர வெயில் ரோஜா மலர்களின் வண்ணத்தையும் அளவையும் கூட்டும்.'
    }
  },
  {
    id: 'vid_chilli',
    cropName: 'Chilli',
    tamilCropName: 'மிளகாய்',
    titleTa: 'மிளகாய் இலைச்சுருட்டு & சாம்பல் நோய் தீர்க்கும் இயற்கை ஸ்ப்ரே',
    titleEn: 'Chilli Leaf Curl & Powdery Mildew Organic Solution',
    descriptionTa: 'மஞ்சள்/நீல வண்ண ஒட்டும் பொறிகள், வேப்ப எண்ணெய் தெளிப்பு மற்றும் பழ அழுகல் கட்டுப்பாடு.',
    duration: '13:05',
    instructor: 'இயற்கை உழவர் இயக்கம் (சுபாஷ் பாலேக்கர் முறை)',
    thumbnail: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&auto=format&fit=crop&q=80',
    videoEmbedId: 'tK3wY8m1qZ9',
    category: 'Vegetable',
    details: {
      growthTimeline: '120 - 150 நாட்கள் (நாற்று: 30 நாள், முதல் பறிப்பு: 75 ஆம் நாள், பின்னர் 10 நாட்களுக்கு ஒருமுறை காய் பறிப்பு).',
      sowingSeason: 'ஜூன் - ஜூலை மற்றும் ஜனவரி - பிப்ரவரி பருவம் மிளகாய்க்கு மிக உகந்தது.',
      wateringSchedule: 'வாரம் இருமுறை அல்லது சொட்டு நீர் மூலம் நாள்விட்டு நாள்; தண்ணீர் தேங்கினால் உடனே வேரழுகல் தாக்கும்.',
      fertilizerDose: 'அடி உரமாக DAP 50 கிலோ + பொட்டாஷ் 40 கிலோ; காய் பிடிக்கும் போது 13-0-45 பொட்டாசியம் நைட்ரேட் தெளிக்கவும்.',
      topDiseases: [
        { name: 'இலைச்சுருட்டு (Leaf Curl)', symptoms: 'இலைகள் மேல்நோக்கி படகு போல சுருண்டு தண்டு குட்டையாகும்.', remedy: 'நீல மற்றும் மஞ்சள் ஒட்டும் பொறிகள் (ஏக்கருக்கு 15) வைக்கவும்; டயபென்தியூரான் தெளிக்கவும்.' },
        { name: 'பழ அழுகல் (Anthracnose Fruit Rot)', symptoms: 'பழுத்த மிளகாய் காய்களில் கருப்பு பள்ளமான புள்ளிகள் தோன்றி காய் அழுகும்.', remedy: 'டிபனோகோனசோல் 1 மிலி/லிட்டர் அல்லது அசாஸ்டிரோபின் தெளிக்கவும்.' },
        { name: 'சாம்பல் நோய் (Powdery Mildew)', symptoms: 'இலையின் அடியில் வெள்ளை தூள் போன்ற பூஞ்சாணம் படர்ந்து இலை உதிரும்.', remedy: 'நனையும் கந்தகம் (Wettable Sulphur 2g/L) தெளிக்கவும்.' }
      ],
      yieldSecrets: 'பூக்கும் போது செவ்வந்தி (Marigold) செடிகளை வரப்புப் பயிராக நட்டால் நூற்புழு மற்றும் அசுவினி பூச்சிகள் மிளகாயை தாக்காது.',
      petSafety: false,
      idealSoil: 'நல்ல வடிகால் கொண்ட கரிசல் மண் அல்லது செம்மண் வண்டல்.',
      sunlightNeeds: 'முழு வெயில் காய்களின் காரத்தன்மையையும் நிறத்தையும் அதிகரிக்கும்.'
    }
  },
  {
    id: 'vid_cotton',
    cropName: 'Cotton',
    tamilCropName: 'பருத்தி',
    titleTa: 'பருத்தி சப்பை உதிர்தல் தடுப்பு & பிங்க் காய்ப்புழு கட்டுப்பாடு',
    titleEn: 'Cotton Square Drop Control & Pink Bollworm Management',
    descriptionTa: 'பிளனோபிக்ஸ் தெளிக்கும் சரியான நேரம், பெரோமோன் பொறிகள் மற்றும் அதிக காய் பிடிப்பு வழி.',
    duration: '14:40',
    instructor: 'மத்திய பருத்தி ஆராய்ச்சி நிறுவனம் (CICR)',
    thumbnail: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800&auto=format&fit=crop&q=80',
    videoEmbedId: 'wY5zX9k1mL3',
    category: 'Commercial',
    details: {
      growthTimeline: '150 - 165 நாட்கள் (முளைப்பு: 7 நாள், சப்பை உருவாதல்: 45 நாள், பூ மலருதல்: 65 நாள், காய் வெடிப்பு: 110-150 நாள்).',
      sowingSeason: 'ஆகஸ்ட் - செப்டம்பர் (குளிர்கால பருத்தி) மற்றும் பிப்ரவரி - மார்ச் (கோடை பருத்தி).',
      wateringSchedule: 'கரிசல் மண்ணில் 10 நாட்களுக்கு ஒருமுறை; காய் வெடிக்கும் போது பாசனத்தை குறைக்க வேண்டும்.',
      fertilizerDose: 'ஏக்கருக்கு யூரியா 80 கிலோ + DAP 60 கிலோ + பொட்டாஷ் 50 கிலோ; 45 மற்றும் 65 ஆம் நாளில் மேலுரம்.',
      topDiseases: [
        { name: 'பிங்க் காய்ப்புழு (Pink Bollworm)', symptoms: 'பூக்கள் ரோஜா பூ போல் முறுக்கிக் கொள்ளும்; காய்களுக்குள் பஞ்சு கருப்பாகும்.', remedy: 'இனக்கவர்ச்சி பொறிகள் 8/ஏக்கர்; இமாமெக்டின் பென்சோயேட் அல்லது பிளூபென்டமைடு தெளிக்கவும்.' },
        { name: 'இலை சிவத்தல் (Leaf Reddening)', symptoms: 'இலைகள் சிவப்பு/செங்கலன் நிறமாக மாறி ஒளிச்சேர்க்கை பாதிக்கப்படும்.', remedy: 'மெக்னீசியம் சல்பேட் (MgSO4) 5 கிராம்/லிட்டர் + யூரியா 10 கிராம்/லிட்டர் தெளிக்கவும்.' },
        { name: 'பாக்டீரியா இலைப்புள்ளி (Black Arm)', symptoms: 'இலை நரம்புகளில் கோண வடிவ கருப்பு புள்ளிகள் தோன்றும்.', remedy: 'ஸ்ட்ரெப்டோசைக்ளின் 1 கிராம் + காப்பர் ஆக்ஸிகுளோரைடு 25 கிராம் தெளிக்கவும்.' }
      ],
      yieldSecrets: '70-80 ஆம் நாளில் பருத்தியின் நுனிக் குருத்தை 2 அங்குலம் கிள்ளிவிட்டால் (Detopping) பக்கவாட்டுக் காய்கள் 30% கூடும்.',
      petSafety: false,
      idealSoil: 'ஆழமான கரிசல் மண் (Black Cotton Soil) அல்லது நல்ல செம்மண்.',
      sunlightNeeds: 'அதிக வெயில் பஞ்சு வெண்மையாகவும் தரம் குறையாமலும் இருக்க அவசியம்.'
    }
  },
  {
    id: 'vid_turmeric',
    cropName: 'Turmeric',
    tamilCropName: 'மஞ்சள்',
    titleTa: 'மஞ்சள் கிழங்கு அழுகல் நோய் வராமல் தடுக்கும் மேட்டுப்பாத்தி முறை',
    titleEn: 'Turmeric Rhizome Rot Prevention & Raised Bed Drenching',
    descriptionTa: 'விதைக்கிழங்கு நேர்த்தி, டிரைக்கோடெர்மா விரிடி பயன்பாடு மற்றும் இலைப்புள்ளி நோய் கட்டுப்பாடு.',
    duration: '12:20',
    instructor: 'ஈரோடு மஞ்சள் விவசாயிகள் கூட்டமைப்பு',
    thumbnail: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
    videoEmbedId: 'kP2wY6m8x0L',
    category: 'Spice',
    details: {
      growthTimeline: '9 மாதங்கள் (270 நாட்கள்); விதைப்பு: மே-ஜூன்; கிழங்கு வளர்ச்சி: ஆகஸ்ட்-நவம்பர்; அறுவடை: ஜனவரி-பிப்ரவரி.',
      sowingSeason: 'மே 15 முதல் ஜூன் 15 வரை நடுவது அதிக குர்குமின் சத்து மற்றும் எடை தரும்.',
      wateringSchedule: 'சொட்டு நீர் மூலம் நாள்விட்டு நாள்; பாத்திகளில் ஒருபோதும் தண்ணீர் தேங்க விடக்கூடாது (கிழங்கு அழுகிவிடும்).',
      fertilizerDose: 'அடி உரமாக ஏக்கருக்கு 15 டன் தொழுவுரம் + 250 கிலோ வேப்பம் புண்ணாக்கு; 30, 60, 90, 120 ஆம் நாளில் N-P-K பிரித்து இடவும்.',
      topDiseases: [
        { name: 'கிழங்கு அழுகல் (Rhizome Rot)', symptoms: 'தண்டு அழுகி துர்நாற்றம் வீசும்; கிழங்கு மென்மையாகி கூழாகும்.', remedy: 'மெட்டலாக்சில் 35% WS 2 கிராம்/லிட்டர் பாத்திகளில் நனைய ஊற்றவும் (Drenching).' },
        { name: 'இலைப்புள்ளி நோய் (Leaf Spot)', symptoms: 'இலைகளில் சாம்பல் நிற மையமுடைய செவ்வக புள்ளிகள் தோன்றி இலை காய்ந்துவிடும்.', remedy: 'சாஃப் (SAAF 2g/L) அல்லது அசாஸ்டிரோபின் 1 மிலி/லிட்டர் தெளிக்கவும்.' },
        { name: 'தண்டு துளைப்பான் புழு (Shoot Borer)', symptoms: 'நடுக்குருத்து காய்ந்து மஞ்சள் நிறமாகும்; தண்டு அடியில் புழு எச்சம் இருக்கும்.', remedy: 'வேப்ப எண்ணெய் 3% அல்லது பேசில்லஸ் துரிஞ்சியென்சிஸ் (Bt) தெளிக்கவும்.' }
      ],
      yieldSecrets: 'நடவு செய்த 45 மற்றும் 90 ஆம் நாளில் மண்புழு உரத்துடன் மண் அணைத்தால் (Earthing up) கிழங்கு பெருத்து மகசூல் இரட்டிப்பாகும்.',
      petSafety: true,
      idealSoil: 'தளர்வான செம்மண் மணல் கலந்த வண்டல் நிலம் (pH: 5.5 - 7.5).',
      sunlightNeeds: 'மிதமான வெயில் அல்லது தென்னந்தோப்பில் ஊடுபயிராக சிறந்த விளைச்சல் தரும்.'
    }
  },
  {
    id: 'vid_sugarcane',
    cropName: 'Sugarcane',
    tamilCropName: 'கரும்பு',
    titleTa: 'கரும்பு செவ்வழுகல் தடுப்பு & சொட்டு நீர் பாசன தொழில்நுட்பம்',
    titleEn: 'Sugarcane Red Rot Control & Drip Fertigation Method',
    descriptionTa: 'கரணைகள் தேர்வு, மண் அணைக்கும் போது உரமிடுதல் மற்றும் அதிக சர்க்கரை சத்து பெறும் உத்திகள்.',
    duration: '15:55',
    instructor: 'கரும்பு ஆராய்ச்சி நிலையம் (கடலூர்)',
    thumbnail: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80',
    videoEmbedId: 'qZ8wX1k5mL9',
    category: 'Commercial',
    details: {
      growthTimeline: '10 - 12 மாதங்கள் (முளைப்பு: 30-45 நாள், தூர் கட்டுதல்: 45-120 நாள், இடைக்கணு வளர்ச்சி: 120-270 நாள், முதிர்வு: 270-360 நாள்).',
      sowingSeason: 'டிசம்பர் - ஜனவரி (முன் பருவம்) மற்றும் பிப்ரவரி - மார்ச் (மத்திய பருவம்).',
      wateringSchedule: 'வளர்ச்சி பருவத்தில் 6-8 நாட்களுக்கு ஒருமுறை; அறுவடைக்கு 20 நாட்கள் முன் நீரை நிறுத்தி சர்க்கரை சத்தை கூட்டவும்.',
      fertilizerDose: 'ஏக்கருக்கு 120 கிலோ யூரியா + 75 கிலோ DAP + 80 கிலோ பொட்டாஷ்; 30, 60, 90 ஆம் நாளில் மண் அணைக்கும் போது இடவும்.',
      topDiseases: [
        { name: 'செவ்வழுகல் நோய் (Red Rot)', symptoms: 'கரும்பின் உட்பகுதி சிவப்பாகி வெள்ளை திட்டுகளுடன் சாராய நாற்றம் வீசும்.', remedy: 'கார்பென்டாசிம் கரைசலில் கரணைகளை 15 நிமிடம் ஊறவைத்து நடுதல்; நோய் எதிர்ப்பு ரகங்கள் நடுதல்.' },
        { name: 'இடைக்கணு புழு (Internode Borer)', symptoms: 'கணுக்களின் அருகே துளைகள் இட்டு உள்ளே சர்க்கரை சதையை புழுக்கள் தின்னும்.', remedy: 'டிரைக்கோடெர்மா முட்டை அட்டைகள் ஏக்கருக்கு 2 வீதம் 45 ஆம் நாள் முதல் விடவும்.' },
        { name: 'கரிப்பூட்டை நோய் (Smut)', symptoms: 'கரும்பின் குருத்து கசை போன்ற கருப்பு சுருளாக மாறி லட்சக்கணக்கான கரும்புகைத் துகள்கள் பரவும்.', remedy: 'நோய் தாக்கிய கரும்புகளை பாலித்தீன் பையால் மூடி வேரோடு பிடுங்கி எரிக்கவும்.' }
      ],
      yieldSecrets: 'கரும்பில் காய்ந்த சோகைகளை 5 மற்றும் 7 ஆம் மாதத்தில் உரித்து வரிசைகளுக்கு நடுவே மூடாக்காக போட்டால் நீர் ஆவியாதல் 40% குறையும்.',
      petSafety: true,
      idealSoil: 'ஆழமான வண்டல் அல்லது செம்மண்; நல்ல வடிகால் வசதி இருக்க வேண்டும்.',
      sunlightNeeds: 'அதிகப்படியான சூரிய கதிர்வீச்சு சர்க்கரைச் சத்து (CCS%) அதிகரிக்க மிக அவசியமானது.'
    }
  },
  {
    id: 'vid_onion',
    cropName: 'Onion',
    tamilCropName: 'சின்ன வெங்காயம்',
    titleTa: 'சின்ன வெங்காயம் ஊதா கருகல் நோய் தடுப்பு & கிழங்கு பெருக்கும் வழி',
    titleEn: 'Small Onion Purple Blotch Management & Bulb Sizing',
    descriptionTa: 'கந்தக உரம் பயன்பாடு, வடிகால் அமைத்தல் மற்றும் அறுவடைக்கு முன் நீர் நிறுத்தும் முறை.',
    duration: '11:15',
    instructor: 'திண்டுக்கல் & தாராபுரம் வெங்காய விவசாயிகள்',
    thumbnail: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&auto=format&fit=crop&q=80',
    videoEmbedId: 'pL9xK2m5w0Q',
    category: 'Vegetable',
    details: {
      growthTimeline: '65 - 75 நாட்கள் (முளைப்பு: 7 நாள், தழை வளர்ச்சி: 15-40 நாள், கிழங்கு திரள்தல்: 40-60 நாள், அறுவடை: 65-75 நாள்).',
      sowingSeason: 'ஏப்ரல் - மே (சித்திரை பட்டம்) மற்றும் அக்டோபர் - நவம்பர் (ஐப்பசி பட்டம்).',
      wateringSchedule: '3 நாட்களுக்கு ஒருமுறை லேசான பாசனம்; அறுவடைக்கு 10 நாட்கள் முன் நீரை முழுமையாக நிறுத்த வேண்டும்.',
      fertilizerDose: 'அடி உரமாக ஏக்கருக்கு ஜிப்சம் அல்லது கந்தகம் (Sulphur) 10 கிலோ + DAP 40 கிலோ + பொட்டாஷ் 35 கிலோ.',
      topDiseases: [
        { name: 'ஊதா கருகல் நோய் (Purple Blotch)', symptoms: 'இலைகளில் ஊதா மையமுடைய நீள்வட்ட புள்ளிகள் தோன்றி இலை நடுவில் முறியும்.', remedy: 'டெபுகோனசோல் 25.9% EC 1.5 மிலி/லிட்டர் அல்லது மேன்கோசெப் தெளிக்கவும்.' },
        { name: 'வெங்காய இலைப்பேன் (Thrips)', symptoms: 'இலைகளில் வெள்ளி நிற வரிகள் தோன்றி இலைகள் சுருண்டு காய்ந்து விடும்.', remedy: 'பிப்ரோனில் 1.5 மிலி அல்லது வேப்ப எண்ணெய் 5% தெளிக்கவும்.' },
        { name: 'அடிப்பகுதி வேரழுகல் (Basal Rot)', symptoms: 'இலைகள் மஞ்சள் நிறமாகி கிழங்கின் அடிப்பகுதி அழுகி நாற்றமடிக்கும்.', remedy: 'டிரைக்கோடெர்மா விரிடி கலந்த தொழுவுரம் பாத்திகளில் இடவும்.' }
      ],
      yieldSecrets: '40 ஆம் நாளில் பொட்டாஷ் உரம் மற்றும் கந்தகம் இடுவது வெங்காயத்தின் எடையையும் சேமிப்புக் காலத்தையும் இரட்டிப்பாக்கும்.',
      petSafety: false, // Toxic to pets!
      idealSoil: 'நல்ல மணல் கலந்த தளர்வான செம்மண் வண்டல் (pH: 6.0 - 7.2).',
      sunlightNeeds: 'முழுமையான வெயில் கிழங்கு திரட்சியாக வளரவும் காரத்தன்மை கூடவும் தேவை.'
    }
  },
  {
    id: 'vid_groundnut',
    cropName: 'Groundnut',
    tamilCropName: 'நிலக்கடலை',
    titleTa: 'நிலக்கடலை ஜிப்சம் போடும் பருவம் & டிக்கா இலைப்புள்ளி தீர்வு',
    titleEn: 'Groundnut Gypsum Application & Tikka Leaf Spot Cure',
    descriptionTa: 'ஊசி இறங்கும் பருவத்தில் மண் அணைத்தல், 45 ஆம் நாள் ஜிப்சம் மற்றும் திரட்சியான பருப்பு வழிகாட்டி.',
    duration: '13:40',
    instructor: 'விருத்தாச்சலம் எண்ணெய்வித்து ஆராய்ச்சி மையம்',
    thumbnail: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=800&auto=format&fit=crop&q=80',
    videoEmbedId: 'rK4wY9m2z1L',
    category: 'Commercial',
    details: {
      growthTimeline: '100 - 105 நாட்கள் (முளைப்பு: 7 நாள், பூத்தல்: 25-30 நாள், ஊசி இறங்குதல்: 40-45 நாள், காய் முதிர்வு: 80-100 நாள்).',
      sowingSeason: 'ஜூன் - ஜூலை (மானாவாரி) மற்றும் டிசம்பர் - ஜனவரி (இறவை பாசனம்).',
      wateringSchedule: 'பூக்கும் போதும் ஊசி இறங்கும் போதும் நிலம் காய்ந்து விடக்கூடாது; 7-10 நாட்களுக்கு ஒருமுறை பாசனம்.',
      fertilizerDose: 'அடி உரமாக DAP 45 கிலோ + பொட்டாஷ் 35 கிலோ; 40-45 ஆம் நாளில் ஏக்கருக்கு 160 கிலோ ஜிப்சம் கட்டாயம் இடவும்.',
      topDiseases: [
        { name: 'டிக்கா இலைப்புள்ளி (Tikka Leaf Spot)', symptoms: 'இலைகளில் மஞ்சள் வளையத்துடன் கூடிய கரும்பழுப்பு புள்ளிகள் தோன்றி இலை உதிரும்.', remedy: 'கார்பென்டாசிம் 50% WP 1 கிராம்/லிட்டர் அல்லது மேன்கோசெப் தெளிக்கவும்.' },
        { name: 'துரு நோய் (Rust)', symptoms: 'இலையின் அடியில் செம்பழுப்பு நிற துரு போன்ற கொப்புளங்கள் தோன்றும்.', remedy: 'புரோபிகோனசோல் 1 மிலி/லிட்டர் தெளிக்கவும்.' },
        { name: 'சுருள் புழு (Leaf Miner)', symptoms: 'இலைகளை சுருட்டி வலை பின்னி உள்ளே பச்சையத்தை சுரண்டி உண்ணும்.', remedy: 'குளோர்பைரிபாஸ் 2 மிலி/லிட்டர் அல்லது வேப்ப எண்ணெய் தெளிக்கவும்.' }
      ],
      yieldSecrets: 'ஊசி இறங்கும் 45 ஆம் நாளில் ஜிப்சம் போட்டு மண் அணைத்தால் தட்டையான காய்கள் இன்றி அனைத்து காய்களிலும் கெட்டியான பருப்பு பிடிக்கும்.',
      petSafety: true,
      idealSoil: 'இலகிய செம்மண் மற்றும் மணற்பாங்கான நிலம் (ஊசி எளிதாக மண்ணிற்குள் இறங்க வேண்டும்).',
      sunlightNeeds: 'முழு வெயில் பூக்கள் அதிகம் பூக்கவும் எண்ணெய் சத்து கூடவும் தேவை.'
    }
  }
];

export const PLASTIC_PROVERBS = [
  {
    proverb: 'மண்ணில் மக்காத பிளாஸ்டிக் பயிர்களின் எமன் — நெகிழி இல்லா மண்ணே பொன் விளையும் பூமி!',
    meaning: 'பிளாஸ்டிக் கழிவுகள் மண்ணில் புதைந்தால் பயிர்களின் வேர்கள் சுவாசிக்க முடியாமல் அழுகும்; நெகிழி அற்ற நிலமே சிறந்த மகசூல் தரும்.'
  },
  {
    proverb: 'பிளாஸ்டிக் தவிர்ப்போம்! பயிர்களைக் காப்போம்! — நச்சு நெகிழி இல்லா நிலமே செழிப்பான பயிரின் தாய்வீடு.',
    meaning: 'மண் வளத்தைப் பாதுகாக்கும் இயற்கை பொருட்களைப் பயன்படுத்தினால் மட்டுமே தலைமுறை தலைமுறையாக விவசாயம் தழைக்கும்.'
  },
  {
    proverb: 'பூமித்தாய்க்கு பிளாஸ்டிக் நஞ்சு; இயற்கை உழவே பயிர்களுக்கு அமிர்தம்!',
    meaning: 'ரசாயன நெகிழி பைகள் நிலத்தின் நுண்ணுயிரிகளையும் மண்புழுக்களையும் அழிக்கின்றன. இயற்கை உரமே பயிரின் வாழ்வாதாரம்.'
  },
  {
    proverb: 'மண் பானை, சணல் சாக்கு, தென்னை நார் — இதுவே தமிழர் வேளாண்மையின் தொன்மைப் பெருமை!',
    meaning: 'பிளாஸ்டிக் நாற்றுப் பைகளுக்கு பதிலாக தென்னை நார் குவளைகளும், பிளாஸ்டிக் சாக்குகளுக்கு பதிலாக சணல் சாக்குகளும் மண்ணிற்கு வளம் சேர்க்கும்.'
  },
  {
    proverb: 'பிளாஸ்டிக் மூடாக்கு வேண்டாம்; காய்ந்த சருகு மூடாக்கே நிலத்தின் இயற்கை உரம்!',
    meaning: 'பிளாஸ்டிக் ஷீட்டுகளுக்கு பதிலாக காய்ந்த இலைகள் மற்றும் வைக்கோல் கொண்டு மூடாக்கு அமைத்தால் ஈரப்பதம் காக்கப்பட்டு காலப்போக்கில் மக்கி உரமாக மாறும்.'
  },
  {
    proverb: 'நெகிழி இல்லாத இயற்கை விவசாயமே அடுத்த தலைமுறைக்கான அமுதக் கொடை!',
    meaning: 'மண்ணைக் காத்தால் மட்டுமே நாம் உண்ணும் உணவு நஞ்சில்லாமல் இருக்கும்; நிலத்திலிருந்து பிளாஸ்டிக்கை முழுமையாக அகற்றுவோம்.'
  }
];

export const LibraryView: React.FC<LibraryViewProps> = ({ currentLanguage, onSelectPlantToAnalyze }) => {
  const t = UI_TRANSLATIONS[currentLanguage];
  
  // Section switcher: 'videos' | 'plastic_free' | 'care_guide'
  const [activeSection, setActiveSection] = useState<'videos' | 'plastic_free' | 'care_guide'>('videos');

  // Video State
  const [videoSearch, setVideoSearch] = useState('');
  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string>('All');
  const [activeVideoModal, setActiveVideoModal] = useState<CropVideoItem | null>(null);
  const [modalTab, setModalTab] = useState<'video' | 'guide'>('guide'); // Default to rich guide as user requested!

  // Care guide state
  const [viewMode, setViewMode] = useState<'byCrop' | 'byPractice'>('byCrop');
  const [selectedCropId, setSelectedCropId] = useState<string>('tomato_crop');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter videos
  const filteredVideos = useMemo(() => {
    return CROP_VIDEOS.filter((v) => {
      const matchCat = selectedVideoCategory === 'All' || v.category === selectedVideoCategory;
      const q = videoSearch.toLowerCase().trim();
      if (!q) return matchCat;
      const matchText = 
        v.cropName.toLowerCase().includes(q) ||
        v.tamilCropName.includes(q) ||
        v.titleTa.includes(q) ||
        v.titleEn.toLowerCase().includes(q) ||
        v.descriptionTa.includes(q);
      return matchCat && matchText;
    });
  }, [videoSearch, selectedVideoCategory]);

  const activeCrop = useMemo(() => {
    return PLANT_GUIDES.find((c) => c.id === selectedCropId) || PLANT_GUIDES[0];
  }, [selectedCropId]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-purple-200 bg-white/15 px-3 py-1 rounded-full">
              📚 Agri-Academy & Crop Guides
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {currentLanguage === 'ta' ? 'பயிர் வழிகாட்டிகள், தமிழ் வீடியோக்கள் & இயற்கை உழவு' : 'Crop Guides, Tamil Videos & Eco-Farming'}
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 max-w-xl">
              {currentLanguage === 'ta' 
                ? 'அனைத்து பயிர்களுக்கான தனித்துவ தமிழ் வீடியோக்கள், நடவு முதல் அறுவடை வரை முழு வழிகாட்டிகள் மற்றும் பிளாஸ்டிக் இல்லா உழவு.'
                : 'Distinct Tamil farming videos for all crops, complete cultivation timelines, secrets & plastic-free farming.'}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => onSelectPlantToAnalyze('Tomato')}
              className="px-4 py-2.5 rounded-2xl bg-white text-purple-900 font-extrabold text-xs shadow-lg hover:bg-purple-50 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-purple-700" />
              <span>{currentLanguage === 'ta' ? 'இலை ஸ்கேன்' : 'Scan Leaf'}</span>
            </button>
          </div>
        </div>

        {/* 3 Main Tabs: Videos, Plastic-Free Eco, Care Guide */}
        <div className="relative z-10 pt-4 flex items-center space-x-2 border-t border-white/20 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveSection('videos')}
            className={`px-4 py-2 rounded-2xl font-black text-xs transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
              activeSection === 'videos'
                ? 'bg-white text-purple-900 shadow-md'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{currentLanguage === 'ta' ? '🎬 தமிழ் பயிர் வீடியோக்கள் & வழிகாட்டிகள்' : '🎬 Tamil Crop Videos & Guides'}</span>
          </button>

          <button
            onClick={() => setActiveSection('plastic_free')}
            className={`px-4 py-2 rounded-2xl font-black text-xs transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
              activeSection === 'plastic_free'
                ? 'bg-white text-purple-900 shadow-md'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>{currentLanguage === 'ta' ? '🚫♻️ நெகிழி தவிர்ப்போம் & பழமொழிகள்' : '🚫 Plastic-Free Farming & Proverbs'}</span>
          </button>

          <button
            onClick={() => setActiveSection('care_guide')}
            className={`px-4 py-2 rounded-2xl font-black text-xs transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
              activeSection === 'care_guide'
                ? 'bg-white text-purple-900 shadow-md'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{currentLanguage === 'ta' ? '📖 13 வேளாண் நெறிமுறைகள்' : '📖 13 Agricultural Pillars'}</span>
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: DISTINCT TAMIL VIDEOS & SMART KNOWLEDGE CARDS FOR ALL CROPS */}
      {/* ========================================================================= */}
      {activeSection === 'videos' && (
        <div className="space-y-5 animate-in fade-in">
          
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-purple-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={videoSearch}
                onChange={(e) => setVideoSearch(e.target.value)}
                placeholder={currentLanguage === 'ta' ? "பயிர்களைத் தேடுங்கள்... (நெல், தக்காளி, வாழை, தென்னை, மல்லிகை, ரோஜா, கரும்பு, நிலக்கடலை...)" : "Search plant by name (Rice, Tomato, Banana, Coconut, Jasmine, Rose, Sugarcane...)"}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-stone-800 border border-purple-200 dark:border-stone-700 rounded-2xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500 shadow-2xs font-semibold"
              />
            </div>

            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
              {['All', 'Cereal', 'Vegetable', 'Fruit', 'Flower', 'Commercial', 'Spice'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedVideoCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedVideoCategory === cat
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-purple-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Videos & Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => {
                  setActiveVideoModal(video);
                  setModalTab('guide'); // Open informative guide immediately!
                }}
                className="bg-white dark:bg-stone-800 rounded-3xl border border-purple-100 dark:border-stone-700 hover:border-purple-400 p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-2.5">
                  {/* Thumbnail with Play Icon & Duration */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900">
                    <img
                      src={video.thumbnail}
                      alt={video.titleTa}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>

                    <div className="absolute top-2 left-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-black shadow-xs">
                        {video.cropName} ({video.tamilCropName})
                      </span>
                    </div>

                    <div className="absolute top-2 right-2">
                      {video.details.petSafety ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-black">
                          🐾 Pet Safe
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-black">
                          ⚠️ Toxic
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2 right-2">
                      <span className="px-2 py-0.5 rounded-full bg-black/80 text-white text-[10px] font-black">
                        ⏱️ {video.duration}
                      </span>
                    </div>
                  </div>

                  {/* Title & Key Specs */}
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm text-stone-900 dark:text-stone-100 line-clamp-2 leading-snug">
                      {video.titleTa}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                      {video.descriptionTa}
                    </p>
                  </div>

                  {/* Quick Spec Pills (Plantora style) */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px]">
                    <div className="p-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-300 font-bold truncate">
                      📅 {video.details.growthTimeline.split('(')[0]}
                    </div>
                    <div className="p-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 font-bold truncate">
                      💧 {video.details.wateringSchedule.split(';')[0]}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-2.5 mt-2 border-t border-stone-100 dark:border-stone-700/60 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="truncate font-semibold">👨‍🌾 {video.instructor}</span>
                  <span className="text-purple-600 font-extrabold flex items-center space-x-1 shrink-0">
                    <span>{currentLanguage === 'ta' ? 'அறிந்து கொள்ள' : 'Learn Details'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: PLASTIC-FREE AGRICULTURE & PROVERBS */}
      {/* ========================================================================= */}
      {activeSection === 'plastic_free' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Main Hero Card for Plastic-Free Soil */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/60 to-purple-50 dark:bg-stone-800/80 border border-emerald-200 dark:border-emerald-900 shadow-sm space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-2xl shadow-md">
                ♻️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-emerald-950 dark:text-emerald-200">
                  {currentLanguage === 'ta' ? 'மண் காப்போம் — நெகிழி தவிர்ப்போம்!' : 'Plastic-Free Soil & Sustainable Farming'}
                </h2>
                <p className="text-xs text-emerald-800 dark:text-emerald-400 font-semibold">
                  {currentLanguage === 'ta' 
                    ? 'மண்ணில் மக்காத பிளாஸ்டிக் பயிர்களின் வேர்களை அழிக்கும் நஞ்சு — இயற்கை வழியில் வேளாண்மை செய்வோம்!' 
                    : 'Non-biodegradable plastics suffocate crop root aerations and destroy soil organisms.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-emerald-100 dark:border-stone-700">
                <span className="text-xs font-black text-rose-600 block">⚠️ வேர் மூச்சுத்திணறல்:</span>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
                  நிலத்தில் புதைந்துள்ள பிளாஸ்டிக் துண்டுகள் வேரின் ஆழமான ஊடுருவலையும், நீரோட்டத்தையும் தடுக்கின்றன.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-emerald-100 dark:border-stone-700">
                <span className="text-xs font-black text-rose-600 block">⚠️ மண்புழு அழிவு:</span>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
                  மைக்ரோ-பிளாஸ்டிக் நச்சுகள் உழவனின் நண்பனான மண்புழுக்கள் மற்றும் நன்மை செய்யும் பாக்டீரியாக்களை அழிக்கின்றன.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-emerald-100 dark:border-stone-700">
                <span className="text-xs font-black text-emerald-600 block">✅ இயற்கை மாற்று:</span>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
                  சணல் பைகள், தென்னை நார் குவளைகள் மற்றும் காய்ந்த இலை மூடாக்கு மண்ணை செழிப்படையச் செய்கின்றன.
                </p>
              </div>
            </div>
          </div>

          {/* Traditional & Inspiring Tamil Agricultural Proverbs */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-stone-900 dark:text-stone-100 flex items-center space-x-2">
              <span>🌾 {currentLanguage === 'ta' ? 'விவசாய பழமொழிகள் & விழிப்புணர்வு பொன்மொழிகள்' : 'Agricultural Proverbs & Wisdom'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PLASTIC_PROVERBS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-white dark:bg-stone-800 border border-purple-100 dark:border-stone-700 hover:border-purple-300 shadow-xs space-y-2 relative overflow-hidden"
                >
                  <div className="text-2xl text-purple-300 select-none">“</div>
                  <h4 className="font-black text-sm text-purple-900 dark:text-purple-200 leading-snug">
                    {item.proverb}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 pt-1 border-t border-stone-100 dark:border-stone-700/60 leading-relaxed">
                    💡 <strong>விளக்கம்:</strong> {item.meaning}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: 13 PILLARS CARE GUIDE */}
      {/* ========================================================================= */}
      {activeSection === 'care_guide' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Crop Selector Bar */}
          <div className="space-y-3 bg-white dark:bg-stone-800 p-4 rounded-3xl border border-stone-200 dark:border-stone-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-black text-stone-900 dark:text-stone-100">
                {currentLanguage === 'ta' ? 'பயிரைத் தேர்ந்தெடுக்கவும்:' : 'Select Crop:'}
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('byCrop')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    viewMode === 'byCrop' ? 'bg-purple-600 text-white' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {currentLanguage === 'ta' ? 'பயிர் வாரியாக' : 'By Crop'}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
              {PLANT_GUIDES.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCropId(crop.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCropId === crop.id
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-600'
                  }`}
                >
                  {crop.name} ({crop.tamilName})
                </button>
              ))}
            </div>
          </div>

          {/* Pillars for Selected Crop */}
          <div className="space-y-4">
            <h3 className="text-base font-black text-stone-900 dark:text-stone-100">
              {activeCrop.name} ({activeCrop.tamilName}) - 13 Agronomic Pillars
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Pillar 1: Watering */}
              <div className="p-4 rounded-3xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-2">
                <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400 font-black text-sm">
                  <Droplets className="w-5 h-5" />
                  <span>1. நீர்ப்பாசனம் (Watering)</span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300">
                  {currentLanguage === 'ta' ? activeCrop.watering.ta : activeCrop.watering.en}
                </p>
                <div className="text-[11px] text-blue-800 dark:text-blue-300 font-semibold pt-1">
                  💧 முறை: {activeCrop.watering.method} | இடைவெளி: {activeCrop.watering.frequency}
                </div>
              </div>

              {/* Pillar 2: Temperature */}
              <div className="p-4 rounded-3xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-2">
                <div className="flex items-center space-x-2 text-rose-700 dark:text-rose-400 font-black text-sm">
                  <Thermometer className="w-5 h-5" />
                  <span>2. உகந்த வெப்பநிலை (Temperature)</span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300">
                  {currentLanguage === 'ta' ? activeCrop.temperature.ta : activeCrop.temperature.en}
                </p>
                <div className="text-[11px] text-rose-800 dark:text-rose-300 font-semibold pt-1">
                  🌡️ உகந்த அளவு: {activeCrop.temperature.idealRange}
                </div>
              </div>

              {/* Pillar 3: Sunlight */}
              <div className="p-4 rounded-3xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 space-y-2">
                <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-black text-sm">
                  <Sun className="w-5 h-5" />
                  <span>3. சூரிய ஒளி (Sunlight)</span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300">
                  {currentLanguage === 'ta' ? activeCrop.sunlight.ta : activeCrop.sunlight.en}
                </p>
                <div className="text-[11px] text-amber-800 dark:text-amber-300 font-semibold pt-1">
                  ☀️ தேவையான நேரம்: {activeCrop.sunlight.hours}
                </div>
              </div>

              {/* Pillar 4: Soil Care & Tilling */}
              <div className="p-4 rounded-3xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-2">
                <div className="flex items-center space-x-2 text-stone-800 dark:text-stone-200 font-black text-sm">
                  <Layers className="w-5 h-5" />
                  <span>4. மண் பராமரிப்பு & உழவு (Soil & Tilling)</span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300">
                  {currentLanguage === 'ta' ? activeCrop.soilCare.ta : activeCrop.soilCare.en}
                </p>
                <div className="text-[11px] text-stone-600 dark:text-stone-400 font-semibold pt-1">
                  🚜 pH: {activeCrop.soilCare.ph} | உழவு: {activeCrop.soilTilling.prepStep}
                </div>
              </div>

              {/* Pillar 5: Fertilizing */}
              <div className="p-4 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-black text-sm">
                  <FlaskConical className="w-5 h-5" />
                  <span>5. உர மேலாண்மை (Fertilization)</span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300">
                  {currentLanguage === 'ta' ? activeCrop.fertilizing.ta : activeCrop.fertilizing.en}
                </p>
                <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold pt-1">
                  🧪 NPK: {activeCrop.fertilizing.npk} | இயற்கை: {activeCrop.fertilizing.organic}
                </div>
              </div>

              {/* Pillar 6: Pest & Disease Control */}
              <div className="p-4 rounded-3xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 space-y-2">
                <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-400 font-black text-sm">
                  <ShieldAlert className="w-5 h-5" />
                  <span>6. பூச்சி & நோய் கட்டுப்பாடு (Pest & Disease)</span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300">
                  {currentLanguage === 'ta' ? activeCrop.pestControl.ta : activeCrop.pestControl.en}
                </p>
                <div className="text-[11px] text-purple-800 dark:text-purple-300 font-semibold pt-1">
                  🛡️ பூச்சிகள்: {Array.isArray(activeCrop.pestControl.majorPests) ? activeCrop.pestControl.majorPests.join(', ') : activeCrop.pestControl.majorPests} | தீர்வு: {activeCrop.pestControl.remedy}
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Embedded Video & Interactive Knowledge Card Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl border border-purple-100 dark:border-stone-800 max-h-[92vh] flex flex-col justify-between">
            
            {/* Modal Top Bar */}
            <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-black">
                  {activeVideoModal.cropName} ({activeVideoModal.tamilCropName})
                </span>
                <h3 className="font-black text-sm text-stone-900 dark:text-stone-100 truncate max-w-xs sm:max-w-md">
                  {activeVideoModal.titleTa}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 flex items-center justify-center hover:bg-stone-200 cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Sub-tabs: Guide vs Video (Addresses User Feedback) */}
            <div className="px-4 pt-3 flex items-center space-x-2 bg-stone-50 dark:bg-stone-800/40 border-b border-stone-200 dark:border-stone-800 shrink-0">
              <button
                onClick={() => setModalTab('guide')}
                className={`py-2 px-3.5 rounded-t-xl text-xs font-black transition-all flex items-center space-x-1.5 cursor-pointer ${
                  modalTab === 'guide'
                    ? 'bg-white dark:bg-stone-900 text-purple-600 border-t-2 border-purple-600 shadow-2xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{currentLanguage === 'ta' ? '📘 முழு பயிர் வழிகாட்டி & ரகசியங்கள்' : '📘 Complete Plant Profile & Secrets'}</span>
              </button>

              <button
                onClick={() => setModalTab('video')}
                className={`py-2 px-3.5 rounded-t-xl text-xs font-black transition-all flex items-center space-x-1.5 cursor-pointer ${
                  modalTab === 'video'
                    ? 'bg-white dark:bg-stone-900 text-purple-600 border-t-2 border-purple-600 shadow-2xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{currentLanguage === 'ta' ? '🎬 வீடியோ பார்க்க (Watch Video)' : '🎬 Video Stream'}</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-4 sm:p-5 space-y-4">
              
              {/* TAB 1: INTERACTIVE PLANT KNOWLEDGE DOSSIER */}
              {modalTab === 'guide' && (
                <div className="space-y-4 animate-in fade-in">
                  
                  {/* Hero Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900 text-center">
                      <span className="text-[10px] text-purple-700 dark:text-purple-300 font-bold block">📅 காலம் / Days</span>
                      <span className="text-xs font-black text-purple-900 dark:text-purple-100 mt-0.5 block truncate">
                        {activeVideoModal.details.growthTimeline.split('(')[0]}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-center">
                      <span className="text-[10px] text-blue-700 dark:text-blue-300 font-bold block">💧 நீர்ப்பாசனம்</span>
                      <span className="text-xs font-black text-blue-900 dark:text-blue-100 mt-0.5 block truncate">
                        {activeVideoModal.details.wateringSchedule.split(';')[0]}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900 text-center">
                      <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold block">☀️ வெளிச்சம்</span>
                      <span className="text-xs font-black text-amber-900 dark:text-amber-100 mt-0.5 block truncate">
                        {activeVideoModal.details.sunlightNeeds.split(';')[0]}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 text-center">
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold block">🐾 செல்லப்பிராணி</span>
                      <span className="text-xs font-black text-emerald-900 dark:text-emerald-100 mt-0.5 block">
                        {activeVideoModal.details.petSafety ? '✅ Safe / நஞ்சற்றது' : '⚠️ Toxic / விஷத்தன்மை'}
                      </span>
                    </div>
                  </div>

                  {/* Growth Timeline */}
                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-1">
                    <span className="text-xs font-black text-stone-900 dark:text-stone-100 flex items-center space-x-1.5">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span>{currentLanguage === 'ta' ? 'நடவு முதல் அறுவடை வரை கால அட்டவணை:' : 'Cultivation & Growth Timeline:'}</span>
                    </span>
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                      {activeVideoModal.details.growthTimeline}
                    </p>
                  </div>

                  {/* Fertilizer & Soil Advice */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-1">
                    <span className="text-xs font-black text-emerald-950 dark:text-emerald-200 flex items-center space-x-1.5">
                      <FlaskConical className="w-4 h-4 text-emerald-600" />
                      <span>{currentLanguage === 'ta' ? 'உர அட்டவணை & ஊட்டச்சத்து அளவு:' : 'Fertilizer Dosage & Soil Prep:'}</span>
                    </span>
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                      {activeVideoModal.details.fertilizerDose}
                    </p>
                    <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold pt-1">
                      🧱 மண் தன்மை: {activeVideoModal.details.idealSoil}
                    </div>
                  </div>

                  {/* Top 3 Diseases & Immediate Cure */}
                  <div className="space-y-2">
                    <span className="text-xs font-black text-stone-900 dark:text-stone-100 flex items-center space-x-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      <span>{currentLanguage === 'ta' ? 'முக்கிய நோய்கள் & உடனடி நிவாரண மருந்துகள்:' : 'Major Crop Diseases & Instant Remedy:'}</span>
                    </span>

                    <div className="space-y-2">
                      {activeVideoModal.details.topDiseases.map((dis, idx) => (
                        <div key={idx} className="p-3 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-xs space-y-1">
                          <span className="font-black text-rose-900 dark:text-rose-200 block">
                            ⚠️ {dis.name}
                          </span>
                          <p className="text-stone-700 dark:text-stone-300">
                            <strong>அறிகுறி:</strong> {dis.symptoms}
                          </p>
                          <p className="text-emerald-800 dark:text-emerald-400 font-semibold pt-0.5">
                            <strong>மருந்து / தீர்வு:</strong> {dis.remedy}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Yield Booster Secret */}
                  <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 space-y-1">
                    <span className="text-xs font-black text-amber-950 dark:text-amber-200 flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>{currentLanguage === 'ta' ? 'அதிக மகசூல் ரகசியம் (Pro Yield Booster):' : 'Pro Yield Secret:'}</span>
                    </span>
                    <p className="text-xs text-amber-900 dark:text-amber-300 font-bold leading-relaxed">
                      💡 {activeVideoModal.details.yieldSecrets}
                    </p>
                  </div>

                </div>
              )}

              {/* TAB 2: DISTINCT EMBEDDED VIDEO PLAYER */}
              {modalTab === 'video' && (
                <div className="space-y-3 animate-in fade-in">
                  <div className="relative aspect-video bg-black w-full rounded-2xl overflow-hidden shadow-inner">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.videoEmbedId}?autoplay=1&rel=0&modestbranding=1`}
                      title={activeVideoModal.titleTa}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {/* Direct YouTube Search Button for this crop */}
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(activeVideoModal.tamilCropName + ' விவசாயம் சாகுபடி நோய்கள் மேலாண்மை தமிழ்')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{currentLanguage === 'ta' ? `YouTube-ல் ${activeVideoModal.tamilCropName} வீடியோக்களைக் காண்க` : `Watch ${activeVideoModal.cropName} Tamil Videos on YouTube`}</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>

                  <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800 space-y-1">
                    <h4 className="font-extrabold text-sm text-stone-900 dark:text-stone-100">
                      {activeVideoModal.titleTa}
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400">
                      {activeVideoModal.descriptionTa}
                    </p>
                    <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs text-stone-500">
                      <span>👨‍🌾 {activeVideoModal.instructor}</span>
                      <span className="font-bold">⏱️ {activeVideoModal.duration}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex items-center space-x-2 shrink-0">
              <button
                onClick={() => {
                  onSelectPlantToAnalyze(activeVideoModal.cropName);
                  setActiveVideoModal(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{currentLanguage === 'ta' ? `${activeVideoModal.tamilCropName} செடியை படம் எடுத்து பரிசோதிக்க` : `Diagnose ${activeVideoModal.cropName} with AI`}</span>
              </button>

              <button
                onClick={() => setActiveVideoModal(null)}
                className="px-4 py-2.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs cursor-pointer"
              >
                {currentLanguage === 'ta' ? 'மூடுக' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
