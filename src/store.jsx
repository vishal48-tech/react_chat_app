import { atom } from 'recoil';

export const text = atom({
    key: 'text',
    default: "",
});

export const search = atom({
    key: 'search',
    default: "",
})

export const files = atom({
    key: 'files',
    default: "",
})

export const filename = atom({
    key: 'filename',
    default: "",
})


export const user = atom({
    key: 'user',
    default: true,
})

export const users = atom({
    key: 'users',
    default: [],
});

export const messages = atom({
    key: 'messages',
    default: {},
})

export const lastChat =
    atom({
        key: 'lastChat',
        default: [],
    })

