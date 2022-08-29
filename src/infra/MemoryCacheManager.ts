import { Mutex } from 'async-mutex'
import { ICacheManager } from '../iface'

type CachedObject = {
  expire: number
  data: unknown
}

type CacheRecord = {
  [key: string]: CachedObject
}

export default class MemoryCacheManager implements ICacheManager {
  private readonly cache: CacheRecord = {}

  private readonly mutex = new Mutex()

  private check(key: string): boolean {
    let success = true

    if (this.cache[key]?.expire < Date.now()) {
      this.del(key)

      success = false
    }

    return success
  }

  public del(key: string): void {
    delete this.cache[key]
  }

  public get<T>(key: string): T | null {
    const value: T | null = null

    if (this.cache[key] && this.check(key)) {
      return this.cache[key].data as T
    }

    return value
  }

  public create(key: string, data: unknown, TTL: number): void {
    if (process.env.NODE_ENV !== 'test') {
      this.cache[key] = {
        expire: Date.now() + TTL,
        data
      }
    }
  }

  public async getOrCreate<T>(key: string, getter: () => Promise<T>, TTL: number): Promise<T> {
    let data = this.get<T>(key)

    if (!data) {
      const release = await this.mutex.acquire()
      try {
        const dataMutex = this.get<T>(key)

        if (dataMutex) {
          data = dataMutex
        } else {
          data = await getter()

          this.create(key, data, TTL)
        }
      } finally {
        release()
      }
    }

    return data
  }
}
