export interface Profile {
  name: string;
  location: string;
  openToWork: boolean;
  availabilityLabel: string;
}

export const profile: Profile = {
  name: '[Tu Nombre]',
  location: 'Córdoba, Argentina',
  openToWork: true,
  availabilityLabel: 'Open to work',
};
