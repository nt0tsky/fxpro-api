const minute = 1000 * 60
enum CacheTime {
  MINUTE = minute,
  HOUR = minute * 60,
  HALF_HOUR = minute * 30,
  QUARTER_HOUR = minute * 15
}

interface ICacheManager {
  get<T>(key: string): T | null
  create(key: string, data: unknown, TTL: number): void
  getOrCreate<T>(key: string, getter: () => Promise<T>, TTL: number): Promise<T>
}

export { ICacheManager, CacheTime }
