import jwt, { SignOptions } from "jsonwebtoken";
export var generateToken = ({ payload, secret, expiresIn }: { payload: object; secret: string; expiresIn: string }) => {
    var options: SignOptions = { expiresIn: expiresIn as any };
    return jwt.sign(payload, secret as string, options);
};
export var verifyToken = ({ token, secret }: { token: string; secret: string }) => {
    return jwt.verify(token, secret);
};