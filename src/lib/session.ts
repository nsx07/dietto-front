export const encrypt = (data: unknown) => Buffer.from(JSON.stringify(data)).toString("base64");

export const decrypt = (data?: string) => (data ? JSON.parse(Buffer.from(data, "base64").toString()) : undefined);
