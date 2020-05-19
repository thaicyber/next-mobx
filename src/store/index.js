import { action, observable, computed, runInAction } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import { useMemo } from 'react'
import { LoginStore } from './allStore'
const isServer = typeof window === 'undefined';

useStaticRendering(isServer)
let store

class Store {
    constructor(initialData) {
        this.loginStore = new LoginStore({ ctx: isServer ? undefined : this, isServer, initialData })
    }

    /** 此處處理 server side 同步 client side store */
    // hydrate = initialData => {
    //     if (!initialData) return


    //     this.lastUpdate = initialData.lastUpdate !== null ? initialData.lastUpdate : Date.now()
    //     this.light = !!initialData.light
    // }
}

function initializeStore(initialData = null) {
    const _store = store ?? new Store(initialData)

    // If your page has Next.js data fetching methods that use a Mobx store, it will
    // if (initialData) {
    //     _store.hydrate(initialData)
    // }
    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}
