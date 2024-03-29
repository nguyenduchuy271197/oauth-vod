import api from "api";

const sdk = api("@teachable/v1.1#xb9b7g33clsf0tli6");
sdk.auth(process.env.API_KEY);

export default sdk;
