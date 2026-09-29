export interface SampleLeaf {
  id: string;
  name: string;
  category: string;
  status: 'Diseased' | 'Healthy' | 'Invalid';
  disease?: string;
  description: string;
  imageUrl: string;
}

export const SAMPLE_PLANTS: SampleLeaf[] = [
  {
    id: 'sample_tomato_early_blight',
    name: 'Tomato (Solanum lycopersicum)',
    category: 'Vegetable',
    status: 'Diseased',
    disease: 'Early Blight (Alternaria solani)',
    description: 'Leaf with concentric brown target spots and yellow chlorotic halos',
    imageUrl: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 'sample_potato_late_blight',
    name: 'Potato (Solanum tuberosum)',
    category: 'Tuber Crop',
    status: 'Diseased',
    disease: 'Late Blight (Phytophthora infestans)',
    description: 'Dark water-soaked leaf lesions with pale halos',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 'sample_rice_blast',
    name: 'Rice (Oryza sativa)',
    category: 'Cereal Grain',
    status: 'Diseased',
    disease: 'Leaf Blast (Magnaporthe oryzae)',
    description: 'Spindle-shaped diamond lesions with grayish centers',
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 'sample_healthy_pepper',
    name: 'Bell Pepper (Capsicum annuum)',
    category: 'Vegetable',
    status: 'Healthy',
    disease: 'None (Healthy)',
    description: 'Vibrant green, smooth unblemished foliage with clean vein structures',
    imageUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 'sample_grape_black_rot',
    name: 'Grape Vine (Vitis vinifera)',
    category: 'Fruit Vine',
    status: 'Diseased',
    disease: 'Black Rot (Guignardia bidwellii)',
    description: 'Small reddish-brown circular spots with dark margins on grape leaf',
    imageUrl: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 'sample_apple_scab',
    name: 'Apple (Malus domestica)',
    category: 'Fruit Tree',
    status: 'Diseased',
    disease: 'Apple Scab (Venturia inaequalis)',
    description: 'Olive-green to dark brown velvety spots along leaf midrib',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 'sample_non_plant',
    name: 'Non-Plant Object (Test Low Confidence / Error)',
    category: 'Non-Plant',
    status: 'Invalid',
    disease: 'Unidentifiable',
    description: 'Test image of a coffee mug/desk to verify the AI reliability guardrails',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&auto=format&fit=crop&q=80'
  }
];
