declare module "ipinfo" {
  export interface IpInfo {
    ip: string;
    hostname?: string;
    city?: string;
    region?: string;
    country?: string;
    loc?: string;
    org?: string;
    postal?: string;
  }

  function ipinfo(
    token: string,
    callback: (err: unknown, data: IpInfo) => void
  ): void;
  export default ipinfo;
}
