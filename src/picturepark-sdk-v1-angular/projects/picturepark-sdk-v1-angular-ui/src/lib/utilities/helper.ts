export function lowerFirst(value: string): string {
    return value.charAt(0).toLowerCase() + value.slice(1);
}

export function isNil(value: any): boolean {
    return value == null;
}
