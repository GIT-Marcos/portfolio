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
  location: 'Argentina - Córdoba',
  openToWork: true,
  availabilityLabel: 'Open to work',
  email: 'mpardo@issd.edu.ar',
  whatsappNumber: '5493512477639',
};

export const contactUrls = {
  email: `mailto:${profile.email}`,
  whatsapp: `https://wa.me/${profile.whatsappNumber}`,
};
