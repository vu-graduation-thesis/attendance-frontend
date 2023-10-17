export function jwtDecode(token: string) {
  const result = {} as any;
  result.raw = token;
  result.header = JSON.parse(window.atob(token.split(".")[0]));
  result.payload = JSON.parse(window.atob(token.split(".")[1]));
  return result;
}
