import Rand, {PRNG} from "rand-seed";

const rand = new Rand('1234', PRNG.mulberry32);

export function randomInt(min: number, max: number): number {
    return Math.floor(rand.next() * (max - min)) + min;
}

export function randomBoolean(): boolean {
    return rand.next() > 0.5;
}

export function randomElement<T>(arr: T[]): T {
    return arr[randomInt(0, arr.length)];
}