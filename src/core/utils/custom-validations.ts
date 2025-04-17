const gidPattern = /^gid:\/\/shopify\/((Collection)|(Product))\/\d{3}$/;
const handlePattern = /^([a-z0-9]+)(-[a-z0-9]+)*$/;
const htmlPattern = /<\/?[a-z][\s\S]*>/;
const couponPattern = /^[A-Z0-9_]*$/;
const properNounPattern = /^[a-zA-ZáéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇüñÜÑ ]*$/;
const emptyEditorPattern = /^<([a-z0-9]+)><\/([a-z0-9]+)>$/;

export const gid = (value: string) => gidPattern.test(value);
export const handle = (value: string) => handlePattern.test(value);
export const noScript = (value: string) =>
  !(value.includes("<script") || value.includes("<iframe"));
export const noHTML = (value: string) => !htmlPattern.test(value);
export const coupon = (value: string) => couponPattern.test(value);
export const properNoun = (value: string) => properNounPattern.test(value);
export const checked = (value: any) => value === true;

export const requiredRichText = (value: string) =>
  !emptyEditorPattern.test(value);
