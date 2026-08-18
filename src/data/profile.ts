export interface Profile {
  name: string;
  location: string;
  openToWork: boolean;
  availabilityLabel: string;
  email: string;
  whatsappNumber: string;
}

export const profile: Profile = {
  name: 'Marcos',
  location: 'Córdoba, Argentina',
  openToWork: true,
  availabilityLabel: 'Open to work',
  email: 'placeholder@email.com',
  whatsappNumber: '5491100000000',
};

export const contactUrls = {
  email: `mailto:${profile.email}`,
  whatsapp: `https://wa.me/${profile.whatsappNumber}`,
};
