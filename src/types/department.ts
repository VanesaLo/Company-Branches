export interface IDepartment {
  id:           number;
  name:         string;
  country_id:   number;
  country_code: string;
  fips_code:    string;
  iso2:         string;
  type:         string;
  latitude:     string;
  longitude:    string;
  created_at:   Date;
  updated_at:   Date;
  flag:         number;
  wikiDataId:   string;
}
