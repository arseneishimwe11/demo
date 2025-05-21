
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ParkingLocation
 * 
 */
export type ParkingLocation = $Result.DefaultSelection<Prisma.$ParkingLocationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ParkingLocations
 * const parkingLocations = await prisma.parkingLocation.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ParkingLocations
   * const parkingLocations = await prisma.parkingLocation.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.parkingLocation`: Exposes CRUD operations for the **ParkingLocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ParkingLocations
    * const parkingLocations = await prisma.parkingLocation.findMany()
    * ```
    */
  get parkingLocation(): Prisma.ParkingLocationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ParkingLocation: 'ParkingLocation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "parkingLocation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ParkingLocation: {
        payload: Prisma.$ParkingLocationPayload<ExtArgs>
        fields: Prisma.ParkingLocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParkingLocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingLocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParkingLocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingLocationPayload>
          }
          findFirst: {
            args: Prisma.ParkingLocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingLocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParkingLocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingLocationPayload>
          }
          findMany: {
            args: Prisma.ParkingLocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingLocationPayload>[]
          }
          create: {
            args: Prisma.ParkingLocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingLocationPayload>
          }
          createMany: {
            args: Prisma.ParkingLocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParkingLocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingLocationPayload>[]
          }
          delete: {
            args: Prisma.ParkingLocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingLocationPayload>
          }
          update: {
            args: Prisma.ParkingLocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingLocationPayload>
          }
          deleteMany: {
            args: Prisma.ParkingLocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParkingLocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ParkingLocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingLocationPayload>[]
          }
          upsert: {
            args: Prisma.ParkingLocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParkingLocationPayload>
          }
          aggregate: {
            args: Prisma.ParkingLocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParkingLocation>
          }
          groupBy: {
            args: Prisma.ParkingLocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParkingLocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParkingLocationCountArgs<ExtArgs>
            result: $Utils.Optional<ParkingLocationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    parkingLocation?: ParkingLocationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model ParkingLocation
   */

  export type AggregateParkingLocation = {
    _count: ParkingLocationCountAggregateOutputType | null
    _avg: ParkingLocationAvgAggregateOutputType | null
    _sum: ParkingLocationSumAggregateOutputType | null
    _min: ParkingLocationMinAggregateOutputType | null
    _max: ParkingLocationMaxAggregateOutputType | null
  }

  export type ParkingLocationAvgAggregateOutputType = {
    id: number | null
    totalSpaces: number | null
    availableSpaces: number | null
    feePerHour: Decimal | null
  }

  export type ParkingLocationSumAggregateOutputType = {
    id: number | null
    totalSpaces: number | null
    availableSpaces: number | null
    feePerHour: Decimal | null
  }

  export type ParkingLocationMinAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
    totalSpaces: number | null
    availableSpaces: number | null
    location: string | null
    feePerHour: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParkingLocationMaxAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
    totalSpaces: number | null
    availableSpaces: number | null
    location: string | null
    feePerHour: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParkingLocationCountAggregateOutputType = {
    id: number
    code: number
    name: number
    totalSpaces: number
    availableSpaces: number
    location: number
    feePerHour: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ParkingLocationAvgAggregateInputType = {
    id?: true
    totalSpaces?: true
    availableSpaces?: true
    feePerHour?: true
  }

  export type ParkingLocationSumAggregateInputType = {
    id?: true
    totalSpaces?: true
    availableSpaces?: true
    feePerHour?: true
  }

  export type ParkingLocationMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    totalSpaces?: true
    availableSpaces?: true
    location?: true
    feePerHour?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ParkingLocationMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    totalSpaces?: true
    availableSpaces?: true
    location?: true
    feePerHour?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ParkingLocationCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    totalSpaces?: true
    availableSpaces?: true
    location?: true
    feePerHour?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ParkingLocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParkingLocation to aggregate.
     */
    where?: ParkingLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParkingLocations to fetch.
     */
    orderBy?: ParkingLocationOrderByWithRelationInput | ParkingLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParkingLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParkingLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParkingLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ParkingLocations
    **/
    _count?: true | ParkingLocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ParkingLocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ParkingLocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParkingLocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParkingLocationMaxAggregateInputType
  }

  export type GetParkingLocationAggregateType<T extends ParkingLocationAggregateArgs> = {
        [P in keyof T & keyof AggregateParkingLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParkingLocation[P]>
      : GetScalarType<T[P], AggregateParkingLocation[P]>
  }




  export type ParkingLocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParkingLocationWhereInput
    orderBy?: ParkingLocationOrderByWithAggregationInput | ParkingLocationOrderByWithAggregationInput[]
    by: ParkingLocationScalarFieldEnum[] | ParkingLocationScalarFieldEnum
    having?: ParkingLocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParkingLocationCountAggregateInputType | true
    _avg?: ParkingLocationAvgAggregateInputType
    _sum?: ParkingLocationSumAggregateInputType
    _min?: ParkingLocationMinAggregateInputType
    _max?: ParkingLocationMaxAggregateInputType
  }

  export type ParkingLocationGroupByOutputType = {
    id: number
    code: string
    name: string
    totalSpaces: number
    availableSpaces: number
    location: string
    feePerHour: Decimal
    createdAt: Date
    updatedAt: Date
    _count: ParkingLocationCountAggregateOutputType | null
    _avg: ParkingLocationAvgAggregateOutputType | null
    _sum: ParkingLocationSumAggregateOutputType | null
    _min: ParkingLocationMinAggregateOutputType | null
    _max: ParkingLocationMaxAggregateOutputType | null
  }

  type GetParkingLocationGroupByPayload<T extends ParkingLocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParkingLocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParkingLocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParkingLocationGroupByOutputType[P]>
            : GetScalarType<T[P], ParkingLocationGroupByOutputType[P]>
        }
      >
    >


  export type ParkingLocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    totalSpaces?: boolean
    availableSpaces?: boolean
    location?: boolean
    feePerHour?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["parkingLocation"]>

  export type ParkingLocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    totalSpaces?: boolean
    availableSpaces?: boolean
    location?: boolean
    feePerHour?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["parkingLocation"]>

  export type ParkingLocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    totalSpaces?: boolean
    availableSpaces?: boolean
    location?: boolean
    feePerHour?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["parkingLocation"]>

  export type ParkingLocationSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    totalSpaces?: boolean
    availableSpaces?: boolean
    location?: boolean
    feePerHour?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ParkingLocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "totalSpaces" | "availableSpaces" | "location" | "feePerHour" | "createdAt" | "updatedAt", ExtArgs["result"]["parkingLocation"]>

  export type $ParkingLocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ParkingLocation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      name: string
      totalSpaces: number
      availableSpaces: number
      location: string
      feePerHour: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["parkingLocation"]>
    composites: {}
  }

  type ParkingLocationGetPayload<S extends boolean | null | undefined | ParkingLocationDefaultArgs> = $Result.GetResult<Prisma.$ParkingLocationPayload, S>

  type ParkingLocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParkingLocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParkingLocationCountAggregateInputType | true
    }

  export interface ParkingLocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ParkingLocation'], meta: { name: 'ParkingLocation' } }
    /**
     * Find zero or one ParkingLocation that matches the filter.
     * @param {ParkingLocationFindUniqueArgs} args - Arguments to find a ParkingLocation
     * @example
     * // Get one ParkingLocation
     * const parkingLocation = await prisma.parkingLocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParkingLocationFindUniqueArgs>(args: SelectSubset<T, ParkingLocationFindUniqueArgs<ExtArgs>>): Prisma__ParkingLocationClient<$Result.GetResult<Prisma.$ParkingLocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ParkingLocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParkingLocationFindUniqueOrThrowArgs} args - Arguments to find a ParkingLocation
     * @example
     * // Get one ParkingLocation
     * const parkingLocation = await prisma.parkingLocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParkingLocationFindUniqueOrThrowArgs>(args: SelectSubset<T, ParkingLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParkingLocationClient<$Result.GetResult<Prisma.$ParkingLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParkingLocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingLocationFindFirstArgs} args - Arguments to find a ParkingLocation
     * @example
     * // Get one ParkingLocation
     * const parkingLocation = await prisma.parkingLocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParkingLocationFindFirstArgs>(args?: SelectSubset<T, ParkingLocationFindFirstArgs<ExtArgs>>): Prisma__ParkingLocationClient<$Result.GetResult<Prisma.$ParkingLocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParkingLocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingLocationFindFirstOrThrowArgs} args - Arguments to find a ParkingLocation
     * @example
     * // Get one ParkingLocation
     * const parkingLocation = await prisma.parkingLocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParkingLocationFindFirstOrThrowArgs>(args?: SelectSubset<T, ParkingLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParkingLocationClient<$Result.GetResult<Prisma.$ParkingLocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ParkingLocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingLocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParkingLocations
     * const parkingLocations = await prisma.parkingLocation.findMany()
     * 
     * // Get first 10 ParkingLocations
     * const parkingLocations = await prisma.parkingLocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const parkingLocationWithIdOnly = await prisma.parkingLocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParkingLocationFindManyArgs>(args?: SelectSubset<T, ParkingLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParkingLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ParkingLocation.
     * @param {ParkingLocationCreateArgs} args - Arguments to create a ParkingLocation.
     * @example
     * // Create one ParkingLocation
     * const ParkingLocation = await prisma.parkingLocation.create({
     *   data: {
     *     // ... data to create a ParkingLocation
     *   }
     * })
     * 
     */
    create<T extends ParkingLocationCreateArgs>(args: SelectSubset<T, ParkingLocationCreateArgs<ExtArgs>>): Prisma__ParkingLocationClient<$Result.GetResult<Prisma.$ParkingLocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ParkingLocations.
     * @param {ParkingLocationCreateManyArgs} args - Arguments to create many ParkingLocations.
     * @example
     * // Create many ParkingLocations
     * const parkingLocation = await prisma.parkingLocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParkingLocationCreateManyArgs>(args?: SelectSubset<T, ParkingLocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ParkingLocations and returns the data saved in the database.
     * @param {ParkingLocationCreateManyAndReturnArgs} args - Arguments to create many ParkingLocations.
     * @example
     * // Create many ParkingLocations
     * const parkingLocation = await prisma.parkingLocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ParkingLocations and only return the `id`
     * const parkingLocationWithIdOnly = await prisma.parkingLocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParkingLocationCreateManyAndReturnArgs>(args?: SelectSubset<T, ParkingLocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParkingLocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ParkingLocation.
     * @param {ParkingLocationDeleteArgs} args - Arguments to delete one ParkingLocation.
     * @example
     * // Delete one ParkingLocation
     * const ParkingLocation = await prisma.parkingLocation.delete({
     *   where: {
     *     // ... filter to delete one ParkingLocation
     *   }
     * })
     * 
     */
    delete<T extends ParkingLocationDeleteArgs>(args: SelectSubset<T, ParkingLocationDeleteArgs<ExtArgs>>): Prisma__ParkingLocationClient<$Result.GetResult<Prisma.$ParkingLocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ParkingLocation.
     * @param {ParkingLocationUpdateArgs} args - Arguments to update one ParkingLocation.
     * @example
     * // Update one ParkingLocation
     * const parkingLocation = await prisma.parkingLocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParkingLocationUpdateArgs>(args: SelectSubset<T, ParkingLocationUpdateArgs<ExtArgs>>): Prisma__ParkingLocationClient<$Result.GetResult<Prisma.$ParkingLocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ParkingLocations.
     * @param {ParkingLocationDeleteManyArgs} args - Arguments to filter ParkingLocations to delete.
     * @example
     * // Delete a few ParkingLocations
     * const { count } = await prisma.parkingLocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParkingLocationDeleteManyArgs>(args?: SelectSubset<T, ParkingLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParkingLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingLocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParkingLocations
     * const parkingLocation = await prisma.parkingLocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParkingLocationUpdateManyArgs>(args: SelectSubset<T, ParkingLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParkingLocations and returns the data updated in the database.
     * @param {ParkingLocationUpdateManyAndReturnArgs} args - Arguments to update many ParkingLocations.
     * @example
     * // Update many ParkingLocations
     * const parkingLocation = await prisma.parkingLocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ParkingLocations and only return the `id`
     * const parkingLocationWithIdOnly = await prisma.parkingLocation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ParkingLocationUpdateManyAndReturnArgs>(args: SelectSubset<T, ParkingLocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParkingLocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ParkingLocation.
     * @param {ParkingLocationUpsertArgs} args - Arguments to update or create a ParkingLocation.
     * @example
     * // Update or create a ParkingLocation
     * const parkingLocation = await prisma.parkingLocation.upsert({
     *   create: {
     *     // ... data to create a ParkingLocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParkingLocation we want to update
     *   }
     * })
     */
    upsert<T extends ParkingLocationUpsertArgs>(args: SelectSubset<T, ParkingLocationUpsertArgs<ExtArgs>>): Prisma__ParkingLocationClient<$Result.GetResult<Prisma.$ParkingLocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ParkingLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingLocationCountArgs} args - Arguments to filter ParkingLocations to count.
     * @example
     * // Count the number of ParkingLocations
     * const count = await prisma.parkingLocation.count({
     *   where: {
     *     // ... the filter for the ParkingLocations we want to count
     *   }
     * })
    **/
    count<T extends ParkingLocationCountArgs>(
      args?: Subset<T, ParkingLocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParkingLocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ParkingLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingLocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParkingLocationAggregateArgs>(args: Subset<T, ParkingLocationAggregateArgs>): Prisma.PrismaPromise<GetParkingLocationAggregateType<T>>

    /**
     * Group by ParkingLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParkingLocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParkingLocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParkingLocationGroupByArgs['orderBy'] }
        : { orderBy?: ParkingLocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParkingLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParkingLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ParkingLocation model
   */
  readonly fields: ParkingLocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ParkingLocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParkingLocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ParkingLocation model
   */
  interface ParkingLocationFieldRefs {
    readonly id: FieldRef<"ParkingLocation", 'Int'>
    readonly code: FieldRef<"ParkingLocation", 'String'>
    readonly name: FieldRef<"ParkingLocation", 'String'>
    readonly totalSpaces: FieldRef<"ParkingLocation", 'Int'>
    readonly availableSpaces: FieldRef<"ParkingLocation", 'Int'>
    readonly location: FieldRef<"ParkingLocation", 'String'>
    readonly feePerHour: FieldRef<"ParkingLocation", 'Decimal'>
    readonly createdAt: FieldRef<"ParkingLocation", 'DateTime'>
    readonly updatedAt: FieldRef<"ParkingLocation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ParkingLocation findUnique
   */
  export type ParkingLocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLocation
     */
    select?: ParkingLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParkingLocation
     */
    omit?: ParkingLocationOmit<ExtArgs> | null
    /**
     * Filter, which ParkingLocation to fetch.
     */
    where: ParkingLocationWhereUniqueInput
  }

  /**
   * ParkingLocation findUniqueOrThrow
   */
  export type ParkingLocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLocation
     */
    select?: ParkingLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParkingLocation
     */
    omit?: ParkingLocationOmit<ExtArgs> | null
    /**
     * Filter, which ParkingLocation to fetch.
     */
    where: ParkingLocationWhereUniqueInput
  }

  /**
   * ParkingLocation findFirst
   */
  export type ParkingLocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLocation
     */
    select?: ParkingLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParkingLocation
     */
    omit?: ParkingLocationOmit<ExtArgs> | null
    /**
     * Filter, which ParkingLocation to fetch.
     */
    where?: ParkingLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParkingLocations to fetch.
     */
    orderBy?: ParkingLocationOrderByWithRelationInput | ParkingLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParkingLocations.
     */
    cursor?: ParkingLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParkingLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParkingLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParkingLocations.
     */
    distinct?: ParkingLocationScalarFieldEnum | ParkingLocationScalarFieldEnum[]
  }

  /**
   * ParkingLocation findFirstOrThrow
   */
  export type ParkingLocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLocation
     */
    select?: ParkingLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParkingLocation
     */
    omit?: ParkingLocationOmit<ExtArgs> | null
    /**
     * Filter, which ParkingLocation to fetch.
     */
    where?: ParkingLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParkingLocations to fetch.
     */
    orderBy?: ParkingLocationOrderByWithRelationInput | ParkingLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParkingLocations.
     */
    cursor?: ParkingLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParkingLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParkingLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParkingLocations.
     */
    distinct?: ParkingLocationScalarFieldEnum | ParkingLocationScalarFieldEnum[]
  }

  /**
   * ParkingLocation findMany
   */
  export type ParkingLocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLocation
     */
    select?: ParkingLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParkingLocation
     */
    omit?: ParkingLocationOmit<ExtArgs> | null
    /**
     * Filter, which ParkingLocations to fetch.
     */
    where?: ParkingLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParkingLocations to fetch.
     */
    orderBy?: ParkingLocationOrderByWithRelationInput | ParkingLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ParkingLocations.
     */
    cursor?: ParkingLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParkingLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParkingLocations.
     */
    skip?: number
    distinct?: ParkingLocationScalarFieldEnum | ParkingLocationScalarFieldEnum[]
  }

  /**
   * ParkingLocation create
   */
  export type ParkingLocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLocation
     */
    select?: ParkingLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParkingLocation
     */
    omit?: ParkingLocationOmit<ExtArgs> | null
    /**
     * The data needed to create a ParkingLocation.
     */
    data: XOR<ParkingLocationCreateInput, ParkingLocationUncheckedCreateInput>
  }

  /**
   * ParkingLocation createMany
   */
  export type ParkingLocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParkingLocations.
     */
    data: ParkingLocationCreateManyInput | ParkingLocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ParkingLocation createManyAndReturn
   */
  export type ParkingLocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLocation
     */
    select?: ParkingLocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ParkingLocation
     */
    omit?: ParkingLocationOmit<ExtArgs> | null
    /**
     * The data used to create many ParkingLocations.
     */
    data: ParkingLocationCreateManyInput | ParkingLocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ParkingLocation update
   */
  export type ParkingLocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLocation
     */
    select?: ParkingLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParkingLocation
     */
    omit?: ParkingLocationOmit<ExtArgs> | null
    /**
     * The data needed to update a ParkingLocation.
     */
    data: XOR<ParkingLocationUpdateInput, ParkingLocationUncheckedUpdateInput>
    /**
     * Choose, which ParkingLocation to update.
     */
    where: ParkingLocationWhereUniqueInput
  }

  /**
   * ParkingLocation updateMany
   */
  export type ParkingLocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ParkingLocations.
     */
    data: XOR<ParkingLocationUpdateManyMutationInput, ParkingLocationUncheckedUpdateManyInput>
    /**
     * Filter which ParkingLocations to update
     */
    where?: ParkingLocationWhereInput
    /**
     * Limit how many ParkingLocations to update.
     */
    limit?: number
  }

  /**
   * ParkingLocation updateManyAndReturn
   */
  export type ParkingLocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLocation
     */
    select?: ParkingLocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ParkingLocation
     */
    omit?: ParkingLocationOmit<ExtArgs> | null
    /**
     * The data used to update ParkingLocations.
     */
    data: XOR<ParkingLocationUpdateManyMutationInput, ParkingLocationUncheckedUpdateManyInput>
    /**
     * Filter which ParkingLocations to update
     */
    where?: ParkingLocationWhereInput
    /**
     * Limit how many ParkingLocations to update.
     */
    limit?: number
  }

  /**
   * ParkingLocation upsert
   */
  export type ParkingLocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLocation
     */
    select?: ParkingLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParkingLocation
     */
    omit?: ParkingLocationOmit<ExtArgs> | null
    /**
     * The filter to search for the ParkingLocation to update in case it exists.
     */
    where: ParkingLocationWhereUniqueInput
    /**
     * In case the ParkingLocation found by the `where` argument doesn't exist, create a new ParkingLocation with this data.
     */
    create: XOR<ParkingLocationCreateInput, ParkingLocationUncheckedCreateInput>
    /**
     * In case the ParkingLocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParkingLocationUpdateInput, ParkingLocationUncheckedUpdateInput>
  }

  /**
   * ParkingLocation delete
   */
  export type ParkingLocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLocation
     */
    select?: ParkingLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParkingLocation
     */
    omit?: ParkingLocationOmit<ExtArgs> | null
    /**
     * Filter which ParkingLocation to delete.
     */
    where: ParkingLocationWhereUniqueInput
  }

  /**
   * ParkingLocation deleteMany
   */
  export type ParkingLocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParkingLocations to delete
     */
    where?: ParkingLocationWhereInput
    /**
     * Limit how many ParkingLocations to delete.
     */
    limit?: number
  }

  /**
   * ParkingLocation without action
   */
  export type ParkingLocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParkingLocation
     */
    select?: ParkingLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParkingLocation
     */
    omit?: ParkingLocationOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ParkingLocationScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    totalSpaces: 'totalSpaces',
    availableSpaces: 'availableSpaces',
    location: 'location',
    feePerHour: 'feePerHour',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ParkingLocationScalarFieldEnum = (typeof ParkingLocationScalarFieldEnum)[keyof typeof ParkingLocationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ParkingLocationWhereInput = {
    AND?: ParkingLocationWhereInput | ParkingLocationWhereInput[]
    OR?: ParkingLocationWhereInput[]
    NOT?: ParkingLocationWhereInput | ParkingLocationWhereInput[]
    id?: IntFilter<"ParkingLocation"> | number
    code?: StringFilter<"ParkingLocation"> | string
    name?: StringFilter<"ParkingLocation"> | string
    totalSpaces?: IntFilter<"ParkingLocation"> | number
    availableSpaces?: IntFilter<"ParkingLocation"> | number
    location?: StringFilter<"ParkingLocation"> | string
    feePerHour?: DecimalFilter<"ParkingLocation"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"ParkingLocation"> | Date | string
    updatedAt?: DateTimeFilter<"ParkingLocation"> | Date | string
  }

  export type ParkingLocationOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    totalSpaces?: SortOrder
    availableSpaces?: SortOrder
    location?: SortOrder
    feePerHour?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParkingLocationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: ParkingLocationWhereInput | ParkingLocationWhereInput[]
    OR?: ParkingLocationWhereInput[]
    NOT?: ParkingLocationWhereInput | ParkingLocationWhereInput[]
    name?: StringFilter<"ParkingLocation"> | string
    totalSpaces?: IntFilter<"ParkingLocation"> | number
    availableSpaces?: IntFilter<"ParkingLocation"> | number
    location?: StringFilter<"ParkingLocation"> | string
    feePerHour?: DecimalFilter<"ParkingLocation"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"ParkingLocation"> | Date | string
    updatedAt?: DateTimeFilter<"ParkingLocation"> | Date | string
  }, "id" | "code">

  export type ParkingLocationOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    totalSpaces?: SortOrder
    availableSpaces?: SortOrder
    location?: SortOrder
    feePerHour?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ParkingLocationCountOrderByAggregateInput
    _avg?: ParkingLocationAvgOrderByAggregateInput
    _max?: ParkingLocationMaxOrderByAggregateInput
    _min?: ParkingLocationMinOrderByAggregateInput
    _sum?: ParkingLocationSumOrderByAggregateInput
  }

  export type ParkingLocationScalarWhereWithAggregatesInput = {
    AND?: ParkingLocationScalarWhereWithAggregatesInput | ParkingLocationScalarWhereWithAggregatesInput[]
    OR?: ParkingLocationScalarWhereWithAggregatesInput[]
    NOT?: ParkingLocationScalarWhereWithAggregatesInput | ParkingLocationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ParkingLocation"> | number
    code?: StringWithAggregatesFilter<"ParkingLocation"> | string
    name?: StringWithAggregatesFilter<"ParkingLocation"> | string
    totalSpaces?: IntWithAggregatesFilter<"ParkingLocation"> | number
    availableSpaces?: IntWithAggregatesFilter<"ParkingLocation"> | number
    location?: StringWithAggregatesFilter<"ParkingLocation"> | string
    feePerHour?: DecimalWithAggregatesFilter<"ParkingLocation"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"ParkingLocation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ParkingLocation"> | Date | string
  }

  export type ParkingLocationCreateInput = {
    code: string
    name: string
    totalSpaces: number
    availableSpaces: number
    location: string
    feePerHour: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParkingLocationUncheckedCreateInput = {
    id?: number
    code: string
    name: string
    totalSpaces: number
    availableSpaces: number
    location: string
    feePerHour: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParkingLocationUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalSpaces?: IntFieldUpdateOperationsInput | number
    availableSpaces?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    feePerHour?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParkingLocationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalSpaces?: IntFieldUpdateOperationsInput | number
    availableSpaces?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    feePerHour?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParkingLocationCreateManyInput = {
    id?: number
    code: string
    name: string
    totalSpaces: number
    availableSpaces: number
    location: string
    feePerHour: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParkingLocationUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalSpaces?: IntFieldUpdateOperationsInput | number
    availableSpaces?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    feePerHour?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParkingLocationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalSpaces?: IntFieldUpdateOperationsInput | number
    availableSpaces?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    feePerHour?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ParkingLocationCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    totalSpaces?: SortOrder
    availableSpaces?: SortOrder
    location?: SortOrder
    feePerHour?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParkingLocationAvgOrderByAggregateInput = {
    id?: SortOrder
    totalSpaces?: SortOrder
    availableSpaces?: SortOrder
    feePerHour?: SortOrder
  }

  export type ParkingLocationMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    totalSpaces?: SortOrder
    availableSpaces?: SortOrder
    location?: SortOrder
    feePerHour?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParkingLocationMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    totalSpaces?: SortOrder
    availableSpaces?: SortOrder
    location?: SortOrder
    feePerHour?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParkingLocationSumOrderByAggregateInput = {
    id?: SortOrder
    totalSpaces?: SortOrder
    availableSpaces?: SortOrder
    feePerHour?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}