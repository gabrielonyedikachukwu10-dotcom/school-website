import { assetPath } from '../utils/assetPath';

export const siteInfo = {
  name: 'Mater Dei Erudite School',
  motto: 'Knowledge is Power, God Our Shield',
  type: 'Nursery, Primary, Junior Secondary and Senior Secondary School',
  address: 'Erudite Street, Off Ilobe Road, Imose, Ejila Awori, Ado Odo, Ota, Ogun State',
  // TODO: Add real school address here if the official address changes.
  phones: ['08034826741', '07060821822'],
  whatsapp: '2349048761530',
  email: 'materdeieruditeschool@gmail.com',
  hours: 'Monday-Friday, 7:00am-6:30pm',
  mapsEmbed:
    'https://www.google.com/maps?q=Ota,%20Ogun%20State,%20Nigeria&output=embed',
  // TODO: Replace with exact Google Maps embed when the school pin is ready.
  logo: assetPath('/images/logo.png'),
  shareImage: assetPath('/images/campus.png'),
  bankDetails: {
    bankName: 'Bank details coming soon',
    accountName: 'Mater Dei Erudite School',
    accountNumber: '0000000000'
    // TODO: Add real school bank details here.
  },
  principal: {
    name: 'Ezebulachi Gerald Chibueze',
    title: 'Principal, Mater Dei Erudite School',
    image: assetPath('/images/principal.png'),
    message:
      'Welcome to Mater Dei Erudite School. At Mater Dei, we stand out by inspiring excellence, building character, and creating a future filled with purpose and opportunity for every child. Our goal is simple: to raise students who are academically strong, morally grounded, and ready to thrive in the world ahead. Our teachers are committed to making learning engaging, personal, and practical. We maintain high standards in both academics and discipline, while ensuring every student feels supported, respected, and encouraged to reach their full potential. Whether in the classroom, on the field, or in our extracurricular programs, we nurture curiosity, confidence, and integrity. Thank you for trusting us with your child’s education. I invite you to visit our campus, meet our team, and see how Mater Dei Erudite School can be the foundation for your child’s success.'
  },
  stats: [
    { value: 250, suffix: '+', label: 'Students' },
    { value: 15, suffix: '+', label: 'Teachers' },
    { value: 7, suffix: '+', label: 'Years of Excellence' }
    // TODO: Update homepage stats numbers here when they change.
  ]
};
