// Arvin has built for the web since 2013. Every place that states his years
// of experience reads it from here, so the number stays right as each new
// build picks up the current year.
export const WEB_DEV_SINCE = 2013;

export const yearsOfExperience = () =>
  new Date().getFullYear() - WEB_DEV_SINCE;
