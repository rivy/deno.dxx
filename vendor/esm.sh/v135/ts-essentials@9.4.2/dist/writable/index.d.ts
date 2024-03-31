export declare type Writable<Type> = {
    -readonly [Key in keyof Type]: Type[Key];
};
