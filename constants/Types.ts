export type Rocket = {
    id: String;
    name: String;
    description: String;
    country: String;
    engine: Engine;
    flickr_images: [string];
  }
  
  export type Engine = {
    number: Number;
  }

export type Launch = {
  id: String;
  name: String;
  date: Date;
  success: Boolean
  patch: MissionPatch
}

export type MissionPatch = {
  small: String;
  large: String;
}