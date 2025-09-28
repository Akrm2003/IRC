
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Friend
 * 
 */
export type Friend = $Result.DefaultSelection<Prisma.$FriendPayload>
/**
 * Model Match
 * 
 */
export type Match = $Result.DefaultSelection<Prisma.$MatchPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model Tournament
 * 
 */
export type Tournament = $Result.DefaultSelection<Prisma.$TournamentPayload>
/**
 * Model TournamentMatch
 * 
 */
export type TournamentMatch = $Result.DefaultSelection<Prisma.$TournamentMatchPayload>
/**
 * Model TournamentPlayer
 * 
 */
export type TournamentPlayer = $Result.DefaultSelection<Prisma.$TournamentPlayerPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OnlineStatus: {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE'
};

export type OnlineStatus = (typeof OnlineStatus)[keyof typeof OnlineStatus]


export const FriendStatus: {
  NOTHING: 'NOTHING',
  PENDING: 'PENDING',
  DECLINED: 'DECLINED',
  ACCEPTED: 'ACCEPTED',
  BLOCKED: 'BLOCKED'
};

export type FriendStatus = (typeof FriendStatus)[keyof typeof FriendStatus]


export const MessageStatus: {
  PENDING: 'PENDING',
  SENT: 'SENT',
  DELIVERED: 'DELIVERED',
  READ: 'READ'
};

export type MessageStatus = (typeof MessageStatus)[keyof typeof MessageStatus]


export const TournamentStatus: {
  UPCOMING: 'UPCOMING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type TournamentStatus = (typeof TournamentStatus)[keyof typeof TournamentStatus]

}

export type OnlineStatus = $Enums.OnlineStatus

export const OnlineStatus: typeof $Enums.OnlineStatus

export type FriendStatus = $Enums.FriendStatus

export const FriendStatus: typeof $Enums.FriendStatus

export type MessageStatus = $Enums.MessageStatus

export const MessageStatus: typeof $Enums.MessageStatus

export type TournamentStatus = $Enums.TournamentStatus

export const TournamentStatus: typeof $Enums.TournamentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.friend`: Exposes CRUD operations for the **Friend** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Friends
    * const friends = await prisma.friend.findMany()
    * ```
    */
  get friend(): Prisma.FriendDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.match`: Exposes CRUD operations for the **Match** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Matches
    * const matches = await prisma.match.findMany()
    * ```
    */
  get match(): Prisma.MatchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tournament`: Exposes CRUD operations for the **Tournament** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tournaments
    * const tournaments = await prisma.tournament.findMany()
    * ```
    */
  get tournament(): Prisma.TournamentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tournamentMatch`: Exposes CRUD operations for the **TournamentMatch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TournamentMatches
    * const tournamentMatches = await prisma.tournamentMatch.findMany()
    * ```
    */
  get tournamentMatch(): Prisma.TournamentMatchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tournamentPlayer`: Exposes CRUD operations for the **TournamentPlayer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TournamentPlayers
    * const tournamentPlayers = await prisma.tournamentPlayer.findMany()
    * ```
    */
  get tournamentPlayer(): Prisma.TournamentPlayerDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
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
    User: 'User',
    Friend: 'Friend',
    Match: 'Match',
    Message: 'Message',
    Tournament: 'Tournament',
    TournamentMatch: 'TournamentMatch',
    TournamentPlayer: 'TournamentPlayer'
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
      modelProps: "user" | "friend" | "match" | "message" | "tournament" | "tournamentMatch" | "tournamentPlayer"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Friend: {
        payload: Prisma.$FriendPayload<ExtArgs>
        fields: Prisma.FriendFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FriendFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FriendFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          findFirst: {
            args: Prisma.FriendFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FriendFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          findMany: {
            args: Prisma.FriendFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>[]
          }
          create: {
            args: Prisma.FriendCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          createMany: {
            args: Prisma.FriendCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FriendCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>[]
          }
          delete: {
            args: Prisma.FriendDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          update: {
            args: Prisma.FriendUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          deleteMany: {
            args: Prisma.FriendDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FriendUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FriendUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>[]
          }
          upsert: {
            args: Prisma.FriendUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          aggregate: {
            args: Prisma.FriendAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFriend>
          }
          groupBy: {
            args: Prisma.FriendGroupByArgs<ExtArgs>
            result: $Utils.Optional<FriendGroupByOutputType>[]
          }
          count: {
            args: Prisma.FriendCountArgs<ExtArgs>
            result: $Utils.Optional<FriendCountAggregateOutputType> | number
          }
        }
      }
      Match: {
        payload: Prisma.$MatchPayload<ExtArgs>
        fields: Prisma.MatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          findFirst: {
            args: Prisma.MatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          findMany: {
            args: Prisma.MatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          create: {
            args: Prisma.MatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          createMany: {
            args: Prisma.MatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          delete: {
            args: Prisma.MatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          update: {
            args: Prisma.MatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          deleteMany: {
            args: Prisma.MatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          upsert: {
            args: Prisma.MatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          aggregate: {
            args: Prisma.MatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatch>
          }
          groupBy: {
            args: Prisma.MatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchCountArgs<ExtArgs>
            result: $Utils.Optional<MatchCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      Tournament: {
        payload: Prisma.$TournamentPayload<ExtArgs>
        fields: Prisma.TournamentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TournamentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TournamentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          findFirst: {
            args: Prisma.TournamentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TournamentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          findMany: {
            args: Prisma.TournamentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>[]
          }
          create: {
            args: Prisma.TournamentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          createMany: {
            args: Prisma.TournamentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TournamentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>[]
          }
          delete: {
            args: Prisma.TournamentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          update: {
            args: Prisma.TournamentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          deleteMany: {
            args: Prisma.TournamentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TournamentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TournamentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>[]
          }
          upsert: {
            args: Prisma.TournamentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          aggregate: {
            args: Prisma.TournamentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTournament>
          }
          groupBy: {
            args: Prisma.TournamentGroupByArgs<ExtArgs>
            result: $Utils.Optional<TournamentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TournamentCountArgs<ExtArgs>
            result: $Utils.Optional<TournamentCountAggregateOutputType> | number
          }
        }
      }
      TournamentMatch: {
        payload: Prisma.$TournamentMatchPayload<ExtArgs>
        fields: Prisma.TournamentMatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TournamentMatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TournamentMatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload>
          }
          findFirst: {
            args: Prisma.TournamentMatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TournamentMatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload>
          }
          findMany: {
            args: Prisma.TournamentMatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload>[]
          }
          create: {
            args: Prisma.TournamentMatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload>
          }
          createMany: {
            args: Prisma.TournamentMatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TournamentMatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload>[]
          }
          delete: {
            args: Prisma.TournamentMatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload>
          }
          update: {
            args: Prisma.TournamentMatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload>
          }
          deleteMany: {
            args: Prisma.TournamentMatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TournamentMatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TournamentMatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload>[]
          }
          upsert: {
            args: Prisma.TournamentMatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentMatchPayload>
          }
          aggregate: {
            args: Prisma.TournamentMatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTournamentMatch>
          }
          groupBy: {
            args: Prisma.TournamentMatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<TournamentMatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.TournamentMatchCountArgs<ExtArgs>
            result: $Utils.Optional<TournamentMatchCountAggregateOutputType> | number
          }
        }
      }
      TournamentPlayer: {
        payload: Prisma.$TournamentPlayerPayload<ExtArgs>
        fields: Prisma.TournamentPlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TournamentPlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TournamentPlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload>
          }
          findFirst: {
            args: Prisma.TournamentPlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TournamentPlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload>
          }
          findMany: {
            args: Prisma.TournamentPlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload>[]
          }
          create: {
            args: Prisma.TournamentPlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload>
          }
          createMany: {
            args: Prisma.TournamentPlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TournamentPlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload>[]
          }
          delete: {
            args: Prisma.TournamentPlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload>
          }
          update: {
            args: Prisma.TournamentPlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload>
          }
          deleteMany: {
            args: Prisma.TournamentPlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TournamentPlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TournamentPlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload>[]
          }
          upsert: {
            args: Prisma.TournamentPlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPlayerPayload>
          }
          aggregate: {
            args: Prisma.TournamentPlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTournamentPlayer>
          }
          groupBy: {
            args: Prisma.TournamentPlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<TournamentPlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.TournamentPlayerCountArgs<ExtArgs>
            result: $Utils.Optional<TournamentPlayerCountAggregateOutputType> | number
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    user?: UserOmit
    friend?: FriendOmit
    match?: MatchOmit
    message?: MessageOmit
    tournament?: TournamentOmit
    tournamentMatch?: TournamentMatchOmit
    tournamentPlayer?: TournamentPlayerOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    friendsSent: number
    friendsReceived: number
    matchesAsPlayer1: number
    matchesWon: number
    sentMessages: number
    receivedMessages: number
    createdTournaments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    friendsSent?: boolean | UserCountOutputTypeCountFriendsSentArgs
    friendsReceived?: boolean | UserCountOutputTypeCountFriendsReceivedArgs
    matchesAsPlayer1?: boolean | UserCountOutputTypeCountMatchesAsPlayer1Args
    matchesWon?: boolean | UserCountOutputTypeCountMatchesWonArgs
    sentMessages?: boolean | UserCountOutputTypeCountSentMessagesArgs
    receivedMessages?: boolean | UserCountOutputTypeCountReceivedMessagesArgs
    createdTournaments?: boolean | UserCountOutputTypeCountCreatedTournamentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendsSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMatchesAsPlayer1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMatchesWonArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedTournamentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentWhereInput
  }


  /**
   * Count Type TournamentCountOutputType
   */

  export type TournamentCountOutputType = {
    players: number
    matches: number
  }

  export type TournamentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | TournamentCountOutputTypeCountPlayersArgs
    matches?: boolean | TournamentCountOutputTypeCountMatchesArgs
  }

  // Custom InputTypes
  /**
   * TournamentCountOutputType without action
   */
  export type TournamentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentCountOutputType
     */
    select?: TournamentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TournamentCountOutputType without action
   */
  export type TournamentCountOutputTypeCountPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentPlayerWhereInput
  }

  /**
   * TournamentCountOutputType without action
   */
  export type TournamentCountOutputTypeCountMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentMatchWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    google_id: string | null
    username: string | null
    email: string | null
    password: string | null
    avatar_url: string | null
    display_name: string | null
    created_at: Date | null
    updated_at: Date | null
    totp_secret: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    google_id: string | null
    username: string | null
    email: string | null
    password: string | null
    avatar_url: string | null
    display_name: string | null
    created_at: Date | null
    updated_at: Date | null
    totp_secret: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    google_id: number
    username: number
    email: number
    password: number
    avatar_url: number
    display_name: number
    created_at: number
    updated_at: number
    totp_secret: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    google_id?: true
    username?: true
    email?: true
    password?: true
    avatar_url?: true
    display_name?: true
    created_at?: true
    updated_at?: true
    totp_secret?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    google_id?: true
    username?: true
    email?: true
    password?: true
    avatar_url?: true
    display_name?: true
    created_at?: true
    updated_at?: true
    totp_secret?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    google_id?: true
    username?: true
    email?: true
    password?: true
    avatar_url?: true
    display_name?: true
    created_at?: true
    updated_at?: true
    totp_secret?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    google_id: string | null
    username: string
    email: string
    password: string | null
    avatar_url: string | null
    display_name: string | null
    created_at: Date
    updated_at: Date
    totp_secret: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    google_id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    avatar_url?: boolean
    display_name?: boolean
    created_at?: boolean
    updated_at?: boolean
    totp_secret?: boolean
    friendsSent?: boolean | User$friendsSentArgs<ExtArgs>
    friendsReceived?: boolean | User$friendsReceivedArgs<ExtArgs>
    matchesAsPlayer1?: boolean | User$matchesAsPlayer1Args<ExtArgs>
    matchesWon?: boolean | User$matchesWonArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    receivedMessages?: boolean | User$receivedMessagesArgs<ExtArgs>
    createdTournaments?: boolean | User$createdTournamentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    google_id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    avatar_url?: boolean
    display_name?: boolean
    created_at?: boolean
    updated_at?: boolean
    totp_secret?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    google_id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    avatar_url?: boolean
    display_name?: boolean
    created_at?: boolean
    updated_at?: boolean
    totp_secret?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    google_id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    avatar_url?: boolean
    display_name?: boolean
    created_at?: boolean
    updated_at?: boolean
    totp_secret?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "google_id" | "username" | "email" | "password" | "avatar_url" | "display_name" | "created_at" | "updated_at" | "totp_secret", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    friendsSent?: boolean | User$friendsSentArgs<ExtArgs>
    friendsReceived?: boolean | User$friendsReceivedArgs<ExtArgs>
    matchesAsPlayer1?: boolean | User$matchesAsPlayer1Args<ExtArgs>
    matchesWon?: boolean | User$matchesWonArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    receivedMessages?: boolean | User$receivedMessagesArgs<ExtArgs>
    createdTournaments?: boolean | User$createdTournamentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      friendsSent: Prisma.$FriendPayload<ExtArgs>[]
      friendsReceived: Prisma.$FriendPayload<ExtArgs>[]
      matchesAsPlayer1: Prisma.$MatchPayload<ExtArgs>[]
      matchesWon: Prisma.$MatchPayload<ExtArgs>[]
      sentMessages: Prisma.$MessagePayload<ExtArgs>[]
      receivedMessages: Prisma.$MessagePayload<ExtArgs>[]
      createdTournaments: Prisma.$TournamentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      google_id: string | null
      username: string
      email: string
      password: string | null
      avatar_url: string | null
      display_name: string | null
      created_at: Date
      updated_at: Date
      totp_secret: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    friendsSent<T extends User$friendsSentArgs<ExtArgs> = {}>(args?: Subset<T, User$friendsSentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friendsReceived<T extends User$friendsReceivedArgs<ExtArgs> = {}>(args?: Subset<T, User$friendsReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matchesAsPlayer1<T extends User$matchesAsPlayer1Args<ExtArgs> = {}>(args?: Subset<T, User$matchesAsPlayer1Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matchesWon<T extends User$matchesWonArgs<ExtArgs> = {}>(args?: Subset<T, User$matchesWonArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentMessages<T extends User$sentMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$sentMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedMessages<T extends User$receivedMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdTournaments<T extends User$createdTournamentsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdTournamentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly google_id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly avatar_url: FieldRef<"User", 'String'>
    readonly display_name: FieldRef<"User", 'String'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
    readonly totp_secret: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.friendsSent
   */
  export type User$friendsSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    where?: FriendWhereInput
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    cursor?: FriendWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * User.friendsReceived
   */
  export type User$friendsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    where?: FriendWhereInput
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    cursor?: FriendWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * User.matchesAsPlayer1
   */
  export type User$matchesAsPlayer1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    cursor?: MatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * User.matchesWon
   */
  export type User$matchesWonArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    cursor?: MatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * User.sentMessages
   */
  export type User$sentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.receivedMessages
   */
  export type User$receivedMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.createdTournaments
   */
  export type User$createdTournamentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    where?: TournamentWhereInput
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    cursor?: TournamentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TournamentScalarFieldEnum | TournamentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Friend
   */

  export type AggregateFriend = {
    _count: FriendCountAggregateOutputType | null
    _avg: FriendAvgAggregateOutputType | null
    _sum: FriendSumAggregateOutputType | null
    _min: FriendMinAggregateOutputType | null
    _max: FriendMaxAggregateOutputType | null
  }

  export type FriendAvgAggregateOutputType = {
    id: number | null
    senderId: number | null
    receiverId: number | null
  }

  export type FriendSumAggregateOutputType = {
    id: number | null
    senderId: number | null
    receiverId: number | null
  }

  export type FriendMinAggregateOutputType = {
    id: number | null
    senderId: number | null
    receiverId: number | null
    status: $Enums.FriendStatus | null
    onlineStatus: $Enums.OnlineStatus | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FriendMaxAggregateOutputType = {
    id: number | null
    senderId: number | null
    receiverId: number | null
    status: $Enums.FriendStatus | null
    onlineStatus: $Enums.OnlineStatus | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FriendCountAggregateOutputType = {
    id: number
    senderId: number
    receiverId: number
    status: number
    onlineStatus: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type FriendAvgAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
  }

  export type FriendSumAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
  }

  export type FriendMinAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    status?: true
    onlineStatus?: true
    created_at?: true
    updated_at?: true
  }

  export type FriendMaxAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    status?: true
    onlineStatus?: true
    created_at?: true
    updated_at?: true
  }

  export type FriendCountAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    status?: true
    onlineStatus?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type FriendAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Friend to aggregate.
     */
    where?: FriendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friends to fetch.
     */
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FriendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Friends
    **/
    _count?: true | FriendCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FriendAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FriendSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FriendMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FriendMaxAggregateInputType
  }

  export type GetFriendAggregateType<T extends FriendAggregateArgs> = {
        [P in keyof T & keyof AggregateFriend]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriend[P]>
      : GetScalarType<T[P], AggregateFriend[P]>
  }




  export type FriendGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendWhereInput
    orderBy?: FriendOrderByWithAggregationInput | FriendOrderByWithAggregationInput[]
    by: FriendScalarFieldEnum[] | FriendScalarFieldEnum
    having?: FriendScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FriendCountAggregateInputType | true
    _avg?: FriendAvgAggregateInputType
    _sum?: FriendSumAggregateInputType
    _min?: FriendMinAggregateInputType
    _max?: FriendMaxAggregateInputType
  }

  export type FriendGroupByOutputType = {
    id: number
    senderId: number
    receiverId: number
    status: $Enums.FriendStatus
    onlineStatus: $Enums.OnlineStatus
    created_at: Date
    updated_at: Date
    _count: FriendCountAggregateOutputType | null
    _avg: FriendAvgAggregateOutputType | null
    _sum: FriendSumAggregateOutputType | null
    _min: FriendMinAggregateOutputType | null
    _max: FriendMaxAggregateOutputType | null
  }

  type GetFriendGroupByPayload<T extends FriendGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FriendGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FriendGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FriendGroupByOutputType[P]>
            : GetScalarType<T[P], FriendGroupByOutputType[P]>
        }
      >
    >


  export type FriendSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    status?: boolean
    onlineStatus?: boolean
    created_at?: boolean
    updated_at?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friend"]>

  export type FriendSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    status?: boolean
    onlineStatus?: boolean
    created_at?: boolean
    updated_at?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friend"]>

  export type FriendSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    status?: boolean
    onlineStatus?: boolean
    created_at?: boolean
    updated_at?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friend"]>

  export type FriendSelectScalar = {
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    status?: boolean
    onlineStatus?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type FriendOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "senderId" | "receiverId" | "status" | "onlineStatus" | "created_at" | "updated_at", ExtArgs["result"]["friend"]>
  export type FriendInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FriendIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FriendIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FriendPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Friend"
    objects: {
      sender: Prisma.$UserPayload<ExtArgs>
      receiver: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      senderId: number
      receiverId: number
      status: $Enums.FriendStatus
      onlineStatus: $Enums.OnlineStatus
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["friend"]>
    composites: {}
  }

  type FriendGetPayload<S extends boolean | null | undefined | FriendDefaultArgs> = $Result.GetResult<Prisma.$FriendPayload, S>

  type FriendCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FriendFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FriendCountAggregateInputType | true
    }

  export interface FriendDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Friend'], meta: { name: 'Friend' } }
    /**
     * Find zero or one Friend that matches the filter.
     * @param {FriendFindUniqueArgs} args - Arguments to find a Friend
     * @example
     * // Get one Friend
     * const friend = await prisma.friend.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FriendFindUniqueArgs>(args: SelectSubset<T, FriendFindUniqueArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Friend that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FriendFindUniqueOrThrowArgs} args - Arguments to find a Friend
     * @example
     * // Get one Friend
     * const friend = await prisma.friend.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FriendFindUniqueOrThrowArgs>(args: SelectSubset<T, FriendFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Friend that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendFindFirstArgs} args - Arguments to find a Friend
     * @example
     * // Get one Friend
     * const friend = await prisma.friend.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FriendFindFirstArgs>(args?: SelectSubset<T, FriendFindFirstArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Friend that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendFindFirstOrThrowArgs} args - Arguments to find a Friend
     * @example
     * // Get one Friend
     * const friend = await prisma.friend.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FriendFindFirstOrThrowArgs>(args?: SelectSubset<T, FriendFindFirstOrThrowArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Friends that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Friends
     * const friends = await prisma.friend.findMany()
     * 
     * // Get first 10 Friends
     * const friends = await prisma.friend.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const friendWithIdOnly = await prisma.friend.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FriendFindManyArgs>(args?: SelectSubset<T, FriendFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Friend.
     * @param {FriendCreateArgs} args - Arguments to create a Friend.
     * @example
     * // Create one Friend
     * const Friend = await prisma.friend.create({
     *   data: {
     *     // ... data to create a Friend
     *   }
     * })
     * 
     */
    create<T extends FriendCreateArgs>(args: SelectSubset<T, FriendCreateArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Friends.
     * @param {FriendCreateManyArgs} args - Arguments to create many Friends.
     * @example
     * // Create many Friends
     * const friend = await prisma.friend.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FriendCreateManyArgs>(args?: SelectSubset<T, FriendCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Friends and returns the data saved in the database.
     * @param {FriendCreateManyAndReturnArgs} args - Arguments to create many Friends.
     * @example
     * // Create many Friends
     * const friend = await prisma.friend.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Friends and only return the `id`
     * const friendWithIdOnly = await prisma.friend.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FriendCreateManyAndReturnArgs>(args?: SelectSubset<T, FriendCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Friend.
     * @param {FriendDeleteArgs} args - Arguments to delete one Friend.
     * @example
     * // Delete one Friend
     * const Friend = await prisma.friend.delete({
     *   where: {
     *     // ... filter to delete one Friend
     *   }
     * })
     * 
     */
    delete<T extends FriendDeleteArgs>(args: SelectSubset<T, FriendDeleteArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Friend.
     * @param {FriendUpdateArgs} args - Arguments to update one Friend.
     * @example
     * // Update one Friend
     * const friend = await prisma.friend.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FriendUpdateArgs>(args: SelectSubset<T, FriendUpdateArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Friends.
     * @param {FriendDeleteManyArgs} args - Arguments to filter Friends to delete.
     * @example
     * // Delete a few Friends
     * const { count } = await prisma.friend.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FriendDeleteManyArgs>(args?: SelectSubset<T, FriendDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Friends.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Friends
     * const friend = await prisma.friend.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FriendUpdateManyArgs>(args: SelectSubset<T, FriendUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Friends and returns the data updated in the database.
     * @param {FriendUpdateManyAndReturnArgs} args - Arguments to update many Friends.
     * @example
     * // Update many Friends
     * const friend = await prisma.friend.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Friends and only return the `id`
     * const friendWithIdOnly = await prisma.friend.updateManyAndReturn({
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
    updateManyAndReturn<T extends FriendUpdateManyAndReturnArgs>(args: SelectSubset<T, FriendUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Friend.
     * @param {FriendUpsertArgs} args - Arguments to update or create a Friend.
     * @example
     * // Update or create a Friend
     * const friend = await prisma.friend.upsert({
     *   create: {
     *     // ... data to create a Friend
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Friend we want to update
     *   }
     * })
     */
    upsert<T extends FriendUpsertArgs>(args: SelectSubset<T, FriendUpsertArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Friends.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendCountArgs} args - Arguments to filter Friends to count.
     * @example
     * // Count the number of Friends
     * const count = await prisma.friend.count({
     *   where: {
     *     // ... the filter for the Friends we want to count
     *   }
     * })
    **/
    count<T extends FriendCountArgs>(
      args?: Subset<T, FriendCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FriendCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Friend.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FriendAggregateArgs>(args: Subset<T, FriendAggregateArgs>): Prisma.PrismaPromise<GetFriendAggregateType<T>>

    /**
     * Group by Friend.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupByArgs} args - Group by arguments.
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
      T extends FriendGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FriendGroupByArgs['orderBy'] }
        : { orderBy?: FriendGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FriendGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriendGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Friend model
   */
  readonly fields: FriendFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Friend.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FriendClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    receiver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Friend model
   */
  interface FriendFieldRefs {
    readonly id: FieldRef<"Friend", 'Int'>
    readonly senderId: FieldRef<"Friend", 'Int'>
    readonly receiverId: FieldRef<"Friend", 'Int'>
    readonly status: FieldRef<"Friend", 'FriendStatus'>
    readonly onlineStatus: FieldRef<"Friend", 'OnlineStatus'>
    readonly created_at: FieldRef<"Friend", 'DateTime'>
    readonly updated_at: FieldRef<"Friend", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Friend findUnique
   */
  export type FriendFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friend to fetch.
     */
    where: FriendWhereUniqueInput
  }

  /**
   * Friend findUniqueOrThrow
   */
  export type FriendFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friend to fetch.
     */
    where: FriendWhereUniqueInput
  }

  /**
   * Friend findFirst
   */
  export type FriendFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friend to fetch.
     */
    where?: FriendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friends to fetch.
     */
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Friends.
     */
    cursor?: FriendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Friends.
     */
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * Friend findFirstOrThrow
   */
  export type FriendFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friend to fetch.
     */
    where?: FriendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friends to fetch.
     */
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Friends.
     */
    cursor?: FriendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Friends.
     */
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * Friend findMany
   */
  export type FriendFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friends to fetch.
     */
    where?: FriendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friends to fetch.
     */
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Friends.
     */
    cursor?: FriendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friends.
     */
    skip?: number
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * Friend create
   */
  export type FriendCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * The data needed to create a Friend.
     */
    data: XOR<FriendCreateInput, FriendUncheckedCreateInput>
  }

  /**
   * Friend createMany
   */
  export type FriendCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Friends.
     */
    data: FriendCreateManyInput | FriendCreateManyInput[]
  }

  /**
   * Friend createManyAndReturn
   */
  export type FriendCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * The data used to create many Friends.
     */
    data: FriendCreateManyInput | FriendCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Friend update
   */
  export type FriendUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * The data needed to update a Friend.
     */
    data: XOR<FriendUpdateInput, FriendUncheckedUpdateInput>
    /**
     * Choose, which Friend to update.
     */
    where: FriendWhereUniqueInput
  }

  /**
   * Friend updateMany
   */
  export type FriendUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Friends.
     */
    data: XOR<FriendUpdateManyMutationInput, FriendUncheckedUpdateManyInput>
    /**
     * Filter which Friends to update
     */
    where?: FriendWhereInput
    /**
     * Limit how many Friends to update.
     */
    limit?: number
  }

  /**
   * Friend updateManyAndReturn
   */
  export type FriendUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * The data used to update Friends.
     */
    data: XOR<FriendUpdateManyMutationInput, FriendUncheckedUpdateManyInput>
    /**
     * Filter which Friends to update
     */
    where?: FriendWhereInput
    /**
     * Limit how many Friends to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Friend upsert
   */
  export type FriendUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * The filter to search for the Friend to update in case it exists.
     */
    where: FriendWhereUniqueInput
    /**
     * In case the Friend found by the `where` argument doesn't exist, create a new Friend with this data.
     */
    create: XOR<FriendCreateInput, FriendUncheckedCreateInput>
    /**
     * In case the Friend was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FriendUpdateInput, FriendUncheckedUpdateInput>
  }

  /**
   * Friend delete
   */
  export type FriendDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter which Friend to delete.
     */
    where: FriendWhereUniqueInput
  }

  /**
   * Friend deleteMany
   */
  export type FriendDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Friends to delete
     */
    where?: FriendWhereInput
    /**
     * Limit how many Friends to delete.
     */
    limit?: number
  }

  /**
   * Friend without action
   */
  export type FriendDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
  }


  /**
   * Model Match
   */

  export type AggregateMatch = {
    _count: MatchCountAggregateOutputType | null
    _avg: MatchAvgAggregateOutputType | null
    _sum: MatchSumAggregateOutputType | null
    _min: MatchMinAggregateOutputType | null
    _max: MatchMaxAggregateOutputType | null
  }

  export type MatchAvgAggregateOutputType = {
    id: number | null
    player1Id: number | null
    winnerId: number | null
    score_p1: number | null
    score_p2: number | null
  }

  export type MatchSumAggregateOutputType = {
    id: number | null
    player1Id: number | null
    winnerId: number | null
    score_p1: number | null
    score_p2: number | null
  }

  export type MatchMinAggregateOutputType = {
    id: number | null
    player1Id: number | null
    player2Name: string | null
    winnerId: number | null
    winnerName: string | null
    score_p1: number | null
    score_p2: number | null
    gameType: string | null
    played_at: Date | null
  }

  export type MatchMaxAggregateOutputType = {
    id: number | null
    player1Id: number | null
    player2Name: string | null
    winnerId: number | null
    winnerName: string | null
    score_p1: number | null
    score_p2: number | null
    gameType: string | null
    played_at: Date | null
  }

  export type MatchCountAggregateOutputType = {
    id: number
    player1Id: number
    player2Name: number
    winnerId: number
    winnerName: number
    score_p1: number
    score_p2: number
    gameType: number
    played_at: number
    _all: number
  }


  export type MatchAvgAggregateInputType = {
    id?: true
    player1Id?: true
    winnerId?: true
    score_p1?: true
    score_p2?: true
  }

  export type MatchSumAggregateInputType = {
    id?: true
    player1Id?: true
    winnerId?: true
    score_p1?: true
    score_p2?: true
  }

  export type MatchMinAggregateInputType = {
    id?: true
    player1Id?: true
    player2Name?: true
    winnerId?: true
    winnerName?: true
    score_p1?: true
    score_p2?: true
    gameType?: true
    played_at?: true
  }

  export type MatchMaxAggregateInputType = {
    id?: true
    player1Id?: true
    player2Name?: true
    winnerId?: true
    winnerName?: true
    score_p1?: true
    score_p2?: true
    gameType?: true
    played_at?: true
  }

  export type MatchCountAggregateInputType = {
    id?: true
    player1Id?: true
    player2Name?: true
    winnerId?: true
    winnerName?: true
    score_p1?: true
    score_p2?: true
    gameType?: true
    played_at?: true
    _all?: true
  }

  export type MatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Match to aggregate.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Matches
    **/
    _count?: true | MatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchMaxAggregateInputType
  }

  export type GetMatchAggregateType<T extends MatchAggregateArgs> = {
        [P in keyof T & keyof AggregateMatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatch[P]>
      : GetScalarType<T[P], AggregateMatch[P]>
  }




  export type MatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithAggregationInput | MatchOrderByWithAggregationInput[]
    by: MatchScalarFieldEnum[] | MatchScalarFieldEnum
    having?: MatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchCountAggregateInputType | true
    _avg?: MatchAvgAggregateInputType
    _sum?: MatchSumAggregateInputType
    _min?: MatchMinAggregateInputType
    _max?: MatchMaxAggregateInputType
  }

  export type MatchGroupByOutputType = {
    id: number
    player1Id: number
    player2Name: string
    winnerId: number | null
    winnerName: string
    score_p1: number
    score_p2: number
    gameType: string
    played_at: Date
    _count: MatchCountAggregateOutputType | null
    _avg: MatchAvgAggregateOutputType | null
    _sum: MatchSumAggregateOutputType | null
    _min: MatchMinAggregateOutputType | null
    _max: MatchMaxAggregateOutputType | null
  }

  type GetMatchGroupByPayload<T extends MatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchGroupByOutputType[P]>
            : GetScalarType<T[P], MatchGroupByOutputType[P]>
        }
      >
    >


  export type MatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    player1Id?: boolean
    player2Name?: boolean
    winnerId?: boolean
    winnerName?: boolean
    score_p1?: boolean
    score_p2?: boolean
    gameType?: boolean
    played_at?: boolean
    player1?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | Match$winnerArgs<ExtArgs>
    tournamentMatch?: boolean | Match$tournamentMatchArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    player1Id?: boolean
    player2Name?: boolean
    winnerId?: boolean
    winnerName?: boolean
    score_p1?: boolean
    score_p2?: boolean
    gameType?: boolean
    played_at?: boolean
    player1?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | Match$winnerArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    player1Id?: boolean
    player2Name?: boolean
    winnerId?: boolean
    winnerName?: boolean
    score_p1?: boolean
    score_p2?: boolean
    gameType?: boolean
    played_at?: boolean
    player1?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | Match$winnerArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectScalar = {
    id?: boolean
    player1Id?: boolean
    player2Name?: boolean
    winnerId?: boolean
    winnerName?: boolean
    score_p1?: boolean
    score_p2?: boolean
    gameType?: boolean
    played_at?: boolean
  }

  export type MatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "player1Id" | "player2Name" | "winnerId" | "winnerName" | "score_p1" | "score_p2" | "gameType" | "played_at", ExtArgs["result"]["match"]>
  export type MatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player1?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | Match$winnerArgs<ExtArgs>
    tournamentMatch?: boolean | Match$tournamentMatchArgs<ExtArgs>
  }
  export type MatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player1?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | Match$winnerArgs<ExtArgs>
  }
  export type MatchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player1?: boolean | UserDefaultArgs<ExtArgs>
    winner?: boolean | Match$winnerArgs<ExtArgs>
  }

  export type $MatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Match"
    objects: {
      player1: Prisma.$UserPayload<ExtArgs>
      winner: Prisma.$UserPayload<ExtArgs> | null
      tournamentMatch: Prisma.$TournamentMatchPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      player1Id: number
      player2Name: string
      winnerId: number | null
      winnerName: string
      score_p1: number
      score_p2: number
      gameType: string
      played_at: Date
    }, ExtArgs["result"]["match"]>
    composites: {}
  }

  type MatchGetPayload<S extends boolean | null | undefined | MatchDefaultArgs> = $Result.GetResult<Prisma.$MatchPayload, S>

  type MatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchCountAggregateInputType | true
    }

  export interface MatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Match'], meta: { name: 'Match' } }
    /**
     * Find zero or one Match that matches the filter.
     * @param {MatchFindUniqueArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchFindUniqueArgs>(args: SelectSubset<T, MatchFindUniqueArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Match that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchFindUniqueOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Match that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchFindFirstArgs>(args?: SelectSubset<T, MatchFindFirstArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Match that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Matches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Matches
     * const matches = await prisma.match.findMany()
     * 
     * // Get first 10 Matches
     * const matches = await prisma.match.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchWithIdOnly = await prisma.match.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchFindManyArgs>(args?: SelectSubset<T, MatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Match.
     * @param {MatchCreateArgs} args - Arguments to create a Match.
     * @example
     * // Create one Match
     * const Match = await prisma.match.create({
     *   data: {
     *     // ... data to create a Match
     *   }
     * })
     * 
     */
    create<T extends MatchCreateArgs>(args: SelectSubset<T, MatchCreateArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Matches.
     * @param {MatchCreateManyArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchCreateManyArgs>(args?: SelectSubset<T, MatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Matches and returns the data saved in the database.
     * @param {MatchCreateManyAndReturnArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Match.
     * @param {MatchDeleteArgs} args - Arguments to delete one Match.
     * @example
     * // Delete one Match
     * const Match = await prisma.match.delete({
     *   where: {
     *     // ... filter to delete one Match
     *   }
     * })
     * 
     */
    delete<T extends MatchDeleteArgs>(args: SelectSubset<T, MatchDeleteArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Match.
     * @param {MatchUpdateArgs} args - Arguments to update one Match.
     * @example
     * // Update one Match
     * const match = await prisma.match.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchUpdateArgs>(args: SelectSubset<T, MatchUpdateArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Matches.
     * @param {MatchDeleteManyArgs} args - Arguments to filter Matches to delete.
     * @example
     * // Delete a few Matches
     * const { count } = await prisma.match.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchDeleteManyArgs>(args?: SelectSubset<T, MatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchUpdateManyArgs>(args: SelectSubset<T, MatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Matches and returns the data updated in the database.
     * @param {MatchUpdateManyAndReturnArgs} args - Arguments to update many Matches.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.updateManyAndReturn({
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
    updateManyAndReturn<T extends MatchUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Match.
     * @param {MatchUpsertArgs} args - Arguments to update or create a Match.
     * @example
     * // Update or create a Match
     * const match = await prisma.match.upsert({
     *   create: {
     *     // ... data to create a Match
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Match we want to update
     *   }
     * })
     */
    upsert<T extends MatchUpsertArgs>(args: SelectSubset<T, MatchUpsertArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchCountArgs} args - Arguments to filter Matches to count.
     * @example
     * // Count the number of Matches
     * const count = await prisma.match.count({
     *   where: {
     *     // ... the filter for the Matches we want to count
     *   }
     * })
    **/
    count<T extends MatchCountArgs>(
      args?: Subset<T, MatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MatchAggregateArgs>(args: Subset<T, MatchAggregateArgs>): Prisma.PrismaPromise<GetMatchAggregateType<T>>

    /**
     * Group by Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchGroupByArgs} args - Group by arguments.
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
      T extends MatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchGroupByArgs['orderBy'] }
        : { orderBy?: MatchGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Match model
   */
  readonly fields: MatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Match.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    player1<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    winner<T extends Match$winnerArgs<ExtArgs> = {}>(args?: Subset<T, Match$winnerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tournamentMatch<T extends Match$tournamentMatchArgs<ExtArgs> = {}>(args?: Subset<T, Match$tournamentMatchArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Match model
   */
  interface MatchFieldRefs {
    readonly id: FieldRef<"Match", 'Int'>
    readonly player1Id: FieldRef<"Match", 'Int'>
    readonly player2Name: FieldRef<"Match", 'String'>
    readonly winnerId: FieldRef<"Match", 'Int'>
    readonly winnerName: FieldRef<"Match", 'String'>
    readonly score_p1: FieldRef<"Match", 'Int'>
    readonly score_p2: FieldRef<"Match", 'Int'>
    readonly gameType: FieldRef<"Match", 'String'>
    readonly played_at: FieldRef<"Match", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Match findUnique
   */
  export type MatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match findUniqueOrThrow
   */
  export type MatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match findFirst
   */
  export type MatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match findFirstOrThrow
   */
  export type MatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match findMany
   */
  export type MatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Matches to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match create
   */
  export type MatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The data needed to create a Match.
     */
    data: XOR<MatchCreateInput, MatchUncheckedCreateInput>
  }

  /**
   * Match createMany
   */
  export type MatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[]
  }

  /**
   * Match createManyAndReturn
   */
  export type MatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Match update
   */
  export type MatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The data needed to update a Match.
     */
    data: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>
    /**
     * Choose, which Match to update.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match updateMany
   */
  export type MatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to update.
     */
    limit?: number
  }

  /**
   * Match updateManyAndReturn
   */
  export type MatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Match upsert
   */
  export type MatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The filter to search for the Match to update in case it exists.
     */
    where: MatchWhereUniqueInput
    /**
     * In case the Match found by the `where` argument doesn't exist, create a new Match with this data.
     */
    create: XOR<MatchCreateInput, MatchUncheckedCreateInput>
    /**
     * In case the Match was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>
  }

  /**
   * Match delete
   */
  export type MatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter which Match to delete.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match deleteMany
   */
  export type MatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Matches to delete
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to delete.
     */
    limit?: number
  }

  /**
   * Match.winner
   */
  export type Match$winnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Match.tournamentMatch
   */
  export type Match$tournamentMatchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentMatch
     */
    omit?: TournamentMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    where?: TournamentMatchWhereInput
  }

  /**
   * Match without action
   */
  export type MatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageAvgAggregateOutputType = {
    id: number | null
    senderId: number | null
    receiverId: number | null
  }

  export type MessageSumAggregateOutputType = {
    id: number | null
    senderId: number | null
    receiverId: number | null
  }

  export type MessageMinAggregateOutputType = {
    id: number | null
    senderId: number | null
    receiverId: number | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    status: $Enums.MessageStatus | null
  }

  export type MessageMaxAggregateOutputType = {
    id: number | null
    senderId: number | null
    receiverId: number | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    status: $Enums.MessageStatus | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    senderId: number
    receiverId: number
    content: number
    createdAt: number
    updatedAt: number
    status: number
    _all: number
  }


  export type MessageAvgAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
  }

  export type MessageSumAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
  }

  export type MessageMinAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    status?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    status?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    status?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _avg?: MessageAvgAggregateInputType
    _sum?: MessageSumAggregateInputType
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: number
    senderId: number
    receiverId: number
    content: string
    createdAt: Date
    updatedAt: Date
    status: $Enums.MessageStatus
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    status?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    status?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    status?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    status?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "senderId" | "receiverId" | "content" | "createdAt" | "updatedAt" | "status", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      sender: Prisma.$UserPayload<ExtArgs>
      receiver: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      senderId: number
      receiverId: number
      content: string
      createdAt: Date
      updatedAt: Date
      status: $Enums.MessageStatus
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
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
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
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
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    receiver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'Int'>
    readonly senderId: FieldRef<"Message", 'Int'>
    readonly receiverId: FieldRef<"Message", 'Int'>
    readonly content: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly updatedAt: FieldRef<"Message", 'DateTime'>
    readonly status: FieldRef<"Message", 'MessageStatus'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model Tournament
   */

  export type AggregateTournament = {
    _count: TournamentCountAggregateOutputType | null
    _avg: TournamentAvgAggregateOutputType | null
    _sum: TournamentSumAggregateOutputType | null
    _min: TournamentMinAggregateOutputType | null
    _max: TournamentMaxAggregateOutputType | null
  }

  export type TournamentAvgAggregateOutputType = {
    id: number | null
    createdById: number | null
  }

  export type TournamentSumAggregateOutputType = {
    id: number | null
    createdById: number | null
  }

  export type TournamentMinAggregateOutputType = {
    id: number | null
    name: string | null
    status: $Enums.TournamentStatus | null
    createdById: number | null
    winnerName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TournamentMaxAggregateOutputType = {
    id: number | null
    name: string | null
    status: $Enums.TournamentStatus | null
    createdById: number | null
    winnerName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TournamentCountAggregateOutputType = {
    id: number
    name: number
    status: number
    createdById: number
    winnerName: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TournamentAvgAggregateInputType = {
    id?: true
    createdById?: true
  }

  export type TournamentSumAggregateInputType = {
    id?: true
    createdById?: true
  }

  export type TournamentMinAggregateInputType = {
    id?: true
    name?: true
    status?: true
    createdById?: true
    winnerName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TournamentMaxAggregateInputType = {
    id?: true
    name?: true
    status?: true
    createdById?: true
    winnerName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TournamentCountAggregateInputType = {
    id?: true
    name?: true
    status?: true
    createdById?: true
    winnerName?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TournamentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tournament to aggregate.
     */
    where?: TournamentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tournaments to fetch.
     */
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TournamentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tournaments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tournaments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tournaments
    **/
    _count?: true | TournamentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TournamentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TournamentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TournamentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TournamentMaxAggregateInputType
  }

  export type GetTournamentAggregateType<T extends TournamentAggregateArgs> = {
        [P in keyof T & keyof AggregateTournament]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTournament[P]>
      : GetScalarType<T[P], AggregateTournament[P]>
  }




  export type TournamentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentWhereInput
    orderBy?: TournamentOrderByWithAggregationInput | TournamentOrderByWithAggregationInput[]
    by: TournamentScalarFieldEnum[] | TournamentScalarFieldEnum
    having?: TournamentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TournamentCountAggregateInputType | true
    _avg?: TournamentAvgAggregateInputType
    _sum?: TournamentSumAggregateInputType
    _min?: TournamentMinAggregateInputType
    _max?: TournamentMaxAggregateInputType
  }

  export type TournamentGroupByOutputType = {
    id: number
    name: string
    status: $Enums.TournamentStatus
    createdById: number
    winnerName: string | null
    createdAt: Date
    updatedAt: Date
    _count: TournamentCountAggregateOutputType | null
    _avg: TournamentAvgAggregateOutputType | null
    _sum: TournamentSumAggregateOutputType | null
    _min: TournamentMinAggregateOutputType | null
    _max: TournamentMaxAggregateOutputType | null
  }

  type GetTournamentGroupByPayload<T extends TournamentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TournamentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TournamentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TournamentGroupByOutputType[P]>
            : GetScalarType<T[P], TournamentGroupByOutputType[P]>
        }
      >
    >


  export type TournamentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    createdById?: boolean
    winnerName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    players?: boolean | Tournament$playersArgs<ExtArgs>
    matches?: boolean | Tournament$matchesArgs<ExtArgs>
    _count?: boolean | TournamentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournament"]>

  export type TournamentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    createdById?: boolean
    winnerName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournament"]>

  export type TournamentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    createdById?: boolean
    winnerName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournament"]>

  export type TournamentSelectScalar = {
    id?: boolean
    name?: boolean
    status?: boolean
    createdById?: boolean
    winnerName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TournamentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "status" | "createdById" | "winnerName" | "createdAt" | "updatedAt", ExtArgs["result"]["tournament"]>
  export type TournamentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    players?: boolean | Tournament$playersArgs<ExtArgs>
    matches?: boolean | Tournament$matchesArgs<ExtArgs>
    _count?: boolean | TournamentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TournamentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TournamentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TournamentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tournament"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      players: Prisma.$TournamentPlayerPayload<ExtArgs>[]
      matches: Prisma.$TournamentMatchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      status: $Enums.TournamentStatus
      createdById: number
      winnerName: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tournament"]>
    composites: {}
  }

  type TournamentGetPayload<S extends boolean | null | undefined | TournamentDefaultArgs> = $Result.GetResult<Prisma.$TournamentPayload, S>

  type TournamentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TournamentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TournamentCountAggregateInputType | true
    }

  export interface TournamentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tournament'], meta: { name: 'Tournament' } }
    /**
     * Find zero or one Tournament that matches the filter.
     * @param {TournamentFindUniqueArgs} args - Arguments to find a Tournament
     * @example
     * // Get one Tournament
     * const tournament = await prisma.tournament.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TournamentFindUniqueArgs>(args: SelectSubset<T, TournamentFindUniqueArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tournament that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TournamentFindUniqueOrThrowArgs} args - Arguments to find a Tournament
     * @example
     * // Get one Tournament
     * const tournament = await prisma.tournament.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TournamentFindUniqueOrThrowArgs>(args: SelectSubset<T, TournamentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tournament that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentFindFirstArgs} args - Arguments to find a Tournament
     * @example
     * // Get one Tournament
     * const tournament = await prisma.tournament.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TournamentFindFirstArgs>(args?: SelectSubset<T, TournamentFindFirstArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tournament that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentFindFirstOrThrowArgs} args - Arguments to find a Tournament
     * @example
     * // Get one Tournament
     * const tournament = await prisma.tournament.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TournamentFindFirstOrThrowArgs>(args?: SelectSubset<T, TournamentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tournaments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tournaments
     * const tournaments = await prisma.tournament.findMany()
     * 
     * // Get first 10 Tournaments
     * const tournaments = await prisma.tournament.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tournamentWithIdOnly = await prisma.tournament.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TournamentFindManyArgs>(args?: SelectSubset<T, TournamentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tournament.
     * @param {TournamentCreateArgs} args - Arguments to create a Tournament.
     * @example
     * // Create one Tournament
     * const Tournament = await prisma.tournament.create({
     *   data: {
     *     // ... data to create a Tournament
     *   }
     * })
     * 
     */
    create<T extends TournamentCreateArgs>(args: SelectSubset<T, TournamentCreateArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tournaments.
     * @param {TournamentCreateManyArgs} args - Arguments to create many Tournaments.
     * @example
     * // Create many Tournaments
     * const tournament = await prisma.tournament.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TournamentCreateManyArgs>(args?: SelectSubset<T, TournamentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tournaments and returns the data saved in the database.
     * @param {TournamentCreateManyAndReturnArgs} args - Arguments to create many Tournaments.
     * @example
     * // Create many Tournaments
     * const tournament = await prisma.tournament.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tournaments and only return the `id`
     * const tournamentWithIdOnly = await prisma.tournament.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TournamentCreateManyAndReturnArgs>(args?: SelectSubset<T, TournamentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tournament.
     * @param {TournamentDeleteArgs} args - Arguments to delete one Tournament.
     * @example
     * // Delete one Tournament
     * const Tournament = await prisma.tournament.delete({
     *   where: {
     *     // ... filter to delete one Tournament
     *   }
     * })
     * 
     */
    delete<T extends TournamentDeleteArgs>(args: SelectSubset<T, TournamentDeleteArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tournament.
     * @param {TournamentUpdateArgs} args - Arguments to update one Tournament.
     * @example
     * // Update one Tournament
     * const tournament = await prisma.tournament.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TournamentUpdateArgs>(args: SelectSubset<T, TournamentUpdateArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tournaments.
     * @param {TournamentDeleteManyArgs} args - Arguments to filter Tournaments to delete.
     * @example
     * // Delete a few Tournaments
     * const { count } = await prisma.tournament.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TournamentDeleteManyArgs>(args?: SelectSubset<T, TournamentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tournaments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tournaments
     * const tournament = await prisma.tournament.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TournamentUpdateManyArgs>(args: SelectSubset<T, TournamentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tournaments and returns the data updated in the database.
     * @param {TournamentUpdateManyAndReturnArgs} args - Arguments to update many Tournaments.
     * @example
     * // Update many Tournaments
     * const tournament = await prisma.tournament.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tournaments and only return the `id`
     * const tournamentWithIdOnly = await prisma.tournament.updateManyAndReturn({
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
    updateManyAndReturn<T extends TournamentUpdateManyAndReturnArgs>(args: SelectSubset<T, TournamentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tournament.
     * @param {TournamentUpsertArgs} args - Arguments to update or create a Tournament.
     * @example
     * // Update or create a Tournament
     * const tournament = await prisma.tournament.upsert({
     *   create: {
     *     // ... data to create a Tournament
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tournament we want to update
     *   }
     * })
     */
    upsert<T extends TournamentUpsertArgs>(args: SelectSubset<T, TournamentUpsertArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tournaments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentCountArgs} args - Arguments to filter Tournaments to count.
     * @example
     * // Count the number of Tournaments
     * const count = await prisma.tournament.count({
     *   where: {
     *     // ... the filter for the Tournaments we want to count
     *   }
     * })
    **/
    count<T extends TournamentCountArgs>(
      args?: Subset<T, TournamentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TournamentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tournament.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TournamentAggregateArgs>(args: Subset<T, TournamentAggregateArgs>): Prisma.PrismaPromise<GetTournamentAggregateType<T>>

    /**
     * Group by Tournament.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentGroupByArgs} args - Group by arguments.
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
      T extends TournamentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TournamentGroupByArgs['orderBy'] }
        : { orderBy?: TournamentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TournamentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTournamentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tournament model
   */
  readonly fields: TournamentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tournament.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TournamentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    players<T extends Tournament$playersArgs<ExtArgs> = {}>(args?: Subset<T, Tournament$playersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matches<T extends Tournament$matchesArgs<ExtArgs> = {}>(args?: Subset<T, Tournament$matchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Tournament model
   */
  interface TournamentFieldRefs {
    readonly id: FieldRef<"Tournament", 'Int'>
    readonly name: FieldRef<"Tournament", 'String'>
    readonly status: FieldRef<"Tournament", 'TournamentStatus'>
    readonly createdById: FieldRef<"Tournament", 'Int'>
    readonly winnerName: FieldRef<"Tournament", 'String'>
    readonly createdAt: FieldRef<"Tournament", 'DateTime'>
    readonly updatedAt: FieldRef<"Tournament", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tournament findUnique
   */
  export type TournamentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournament to fetch.
     */
    where: TournamentWhereUniqueInput
  }

  /**
   * Tournament findUniqueOrThrow
   */
  export type TournamentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournament to fetch.
     */
    where: TournamentWhereUniqueInput
  }

  /**
   * Tournament findFirst
   */
  export type TournamentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournament to fetch.
     */
    where?: TournamentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tournaments to fetch.
     */
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tournaments.
     */
    cursor?: TournamentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tournaments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tournaments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tournaments.
     */
    distinct?: TournamentScalarFieldEnum | TournamentScalarFieldEnum[]
  }

  /**
   * Tournament findFirstOrThrow
   */
  export type TournamentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournament to fetch.
     */
    where?: TournamentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tournaments to fetch.
     */
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tournaments.
     */
    cursor?: TournamentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tournaments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tournaments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tournaments.
     */
    distinct?: TournamentScalarFieldEnum | TournamentScalarFieldEnum[]
  }

  /**
   * Tournament findMany
   */
  export type TournamentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournaments to fetch.
     */
    where?: TournamentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tournaments to fetch.
     */
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tournaments.
     */
    cursor?: TournamentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tournaments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tournaments.
     */
    skip?: number
    distinct?: TournamentScalarFieldEnum | TournamentScalarFieldEnum[]
  }

  /**
   * Tournament create
   */
  export type TournamentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * The data needed to create a Tournament.
     */
    data: XOR<TournamentCreateInput, TournamentUncheckedCreateInput>
  }

  /**
   * Tournament createMany
   */
  export type TournamentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tournaments.
     */
    data: TournamentCreateManyInput | TournamentCreateManyInput[]
  }

  /**
   * Tournament createManyAndReturn
   */
  export type TournamentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * The data used to create many Tournaments.
     */
    data: TournamentCreateManyInput | TournamentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tournament update
   */
  export type TournamentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * The data needed to update a Tournament.
     */
    data: XOR<TournamentUpdateInput, TournamentUncheckedUpdateInput>
    /**
     * Choose, which Tournament to update.
     */
    where: TournamentWhereUniqueInput
  }

  /**
   * Tournament updateMany
   */
  export type TournamentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tournaments.
     */
    data: XOR<TournamentUpdateManyMutationInput, TournamentUncheckedUpdateManyInput>
    /**
     * Filter which Tournaments to update
     */
    where?: TournamentWhereInput
    /**
     * Limit how many Tournaments to update.
     */
    limit?: number
  }

  /**
   * Tournament updateManyAndReturn
   */
  export type TournamentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * The data used to update Tournaments.
     */
    data: XOR<TournamentUpdateManyMutationInput, TournamentUncheckedUpdateManyInput>
    /**
     * Filter which Tournaments to update
     */
    where?: TournamentWhereInput
    /**
     * Limit how many Tournaments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tournament upsert
   */
  export type TournamentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * The filter to search for the Tournament to update in case it exists.
     */
    where: TournamentWhereUniqueInput
    /**
     * In case the Tournament found by the `where` argument doesn't exist, create a new Tournament with this data.
     */
    create: XOR<TournamentCreateInput, TournamentUncheckedCreateInput>
    /**
     * In case the Tournament was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TournamentUpdateInput, TournamentUncheckedUpdateInput>
  }

  /**
   * Tournament delete
   */
  export type TournamentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter which Tournament to delete.
     */
    where: TournamentWhereUniqueInput
  }

  /**
   * Tournament deleteMany
   */
  export type TournamentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tournaments to delete
     */
    where?: TournamentWhereInput
    /**
     * Limit how many Tournaments to delete.
     */
    limit?: number
  }

  /**
   * Tournament.players
   */
  export type Tournament$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentPlayer
     */
    omit?: TournamentPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    where?: TournamentPlayerWhereInput
    orderBy?: TournamentPlayerOrderByWithRelationInput | TournamentPlayerOrderByWithRelationInput[]
    cursor?: TournamentPlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TournamentPlayerScalarFieldEnum | TournamentPlayerScalarFieldEnum[]
  }

  /**
   * Tournament.matches
   */
  export type Tournament$matchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentMatch
     */
    omit?: TournamentMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    where?: TournamentMatchWhereInput
    orderBy?: TournamentMatchOrderByWithRelationInput | TournamentMatchOrderByWithRelationInput[]
    cursor?: TournamentMatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TournamentMatchScalarFieldEnum | TournamentMatchScalarFieldEnum[]
  }

  /**
   * Tournament without action
   */
  export type TournamentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
  }


  /**
   * Model TournamentMatch
   */

  export type AggregateTournamentMatch = {
    _count: TournamentMatchCountAggregateOutputType | null
    _avg: TournamentMatchAvgAggregateOutputType | null
    _sum: TournamentMatchSumAggregateOutputType | null
    _min: TournamentMatchMinAggregateOutputType | null
    _max: TournamentMatchMaxAggregateOutputType | null
  }

  export type TournamentMatchAvgAggregateOutputType = {
    id: number | null
    tournamentId: number | null
    matchId: number | null
    roundNumber: number | null
    matchNumber: number | null
  }

  export type TournamentMatchSumAggregateOutputType = {
    id: number | null
    tournamentId: number | null
    matchId: number | null
    roundNumber: number | null
    matchNumber: number | null
  }

  export type TournamentMatchMinAggregateOutputType = {
    id: number | null
    tournamentId: number | null
    matchId: number | null
    roundNumber: number | null
    matchNumber: number | null
    player1Name: string | null
    player2Name: string | null
    winnerName: string | null
    isBye: boolean | null
  }

  export type TournamentMatchMaxAggregateOutputType = {
    id: number | null
    tournamentId: number | null
    matchId: number | null
    roundNumber: number | null
    matchNumber: number | null
    player1Name: string | null
    player2Name: string | null
    winnerName: string | null
    isBye: boolean | null
  }

  export type TournamentMatchCountAggregateOutputType = {
    id: number
    tournamentId: number
    matchId: number
    roundNumber: number
    matchNumber: number
    player1Name: number
    player2Name: number
    winnerName: number
    isBye: number
    _all: number
  }


  export type TournamentMatchAvgAggregateInputType = {
    id?: true
    tournamentId?: true
    matchId?: true
    roundNumber?: true
    matchNumber?: true
  }

  export type TournamentMatchSumAggregateInputType = {
    id?: true
    tournamentId?: true
    matchId?: true
    roundNumber?: true
    matchNumber?: true
  }

  export type TournamentMatchMinAggregateInputType = {
    id?: true
    tournamentId?: true
    matchId?: true
    roundNumber?: true
    matchNumber?: true
    player1Name?: true
    player2Name?: true
    winnerName?: true
    isBye?: true
  }

  export type TournamentMatchMaxAggregateInputType = {
    id?: true
    tournamentId?: true
    matchId?: true
    roundNumber?: true
    matchNumber?: true
    player1Name?: true
    player2Name?: true
    winnerName?: true
    isBye?: true
  }

  export type TournamentMatchCountAggregateInputType = {
    id?: true
    tournamentId?: true
    matchId?: true
    roundNumber?: true
    matchNumber?: true
    player1Name?: true
    player2Name?: true
    winnerName?: true
    isBye?: true
    _all?: true
  }

  export type TournamentMatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TournamentMatch to aggregate.
     */
    where?: TournamentMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentMatches to fetch.
     */
    orderBy?: TournamentMatchOrderByWithRelationInput | TournamentMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TournamentMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TournamentMatches
    **/
    _count?: true | TournamentMatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TournamentMatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TournamentMatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TournamentMatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TournamentMatchMaxAggregateInputType
  }

  export type GetTournamentMatchAggregateType<T extends TournamentMatchAggregateArgs> = {
        [P in keyof T & keyof AggregateTournamentMatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTournamentMatch[P]>
      : GetScalarType<T[P], AggregateTournamentMatch[P]>
  }




  export type TournamentMatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentMatchWhereInput
    orderBy?: TournamentMatchOrderByWithAggregationInput | TournamentMatchOrderByWithAggregationInput[]
    by: TournamentMatchScalarFieldEnum[] | TournamentMatchScalarFieldEnum
    having?: TournamentMatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TournamentMatchCountAggregateInputType | true
    _avg?: TournamentMatchAvgAggregateInputType
    _sum?: TournamentMatchSumAggregateInputType
    _min?: TournamentMatchMinAggregateInputType
    _max?: TournamentMatchMaxAggregateInputType
  }

  export type TournamentMatchGroupByOutputType = {
    id: number
    tournamentId: number
    matchId: number
    roundNumber: number
    matchNumber: number
    player1Name: string
    player2Name: string
    winnerName: string | null
    isBye: boolean
    _count: TournamentMatchCountAggregateOutputType | null
    _avg: TournamentMatchAvgAggregateOutputType | null
    _sum: TournamentMatchSumAggregateOutputType | null
    _min: TournamentMatchMinAggregateOutputType | null
    _max: TournamentMatchMaxAggregateOutputType | null
  }

  type GetTournamentMatchGroupByPayload<T extends TournamentMatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TournamentMatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TournamentMatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TournamentMatchGroupByOutputType[P]>
            : GetScalarType<T[P], TournamentMatchGroupByOutputType[P]>
        }
      >
    >


  export type TournamentMatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentId?: boolean
    matchId?: boolean
    roundNumber?: boolean
    matchNumber?: boolean
    player1Name?: boolean
    player2Name?: boolean
    winnerName?: boolean
    isBye?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournamentMatch"]>

  export type TournamentMatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentId?: boolean
    matchId?: boolean
    roundNumber?: boolean
    matchNumber?: boolean
    player1Name?: boolean
    player2Name?: boolean
    winnerName?: boolean
    isBye?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournamentMatch"]>

  export type TournamentMatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentId?: boolean
    matchId?: boolean
    roundNumber?: boolean
    matchNumber?: boolean
    player1Name?: boolean
    player2Name?: boolean
    winnerName?: boolean
    isBye?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournamentMatch"]>

  export type TournamentMatchSelectScalar = {
    id?: boolean
    tournamentId?: boolean
    matchId?: boolean
    roundNumber?: boolean
    matchNumber?: boolean
    player1Name?: boolean
    player2Name?: boolean
    winnerName?: boolean
    isBye?: boolean
  }

  export type TournamentMatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tournamentId" | "matchId" | "roundNumber" | "matchNumber" | "player1Name" | "player2Name" | "winnerName" | "isBye", ExtArgs["result"]["tournamentMatch"]>
  export type TournamentMatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }
  export type TournamentMatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }
  export type TournamentMatchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }

  export type $TournamentMatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TournamentMatch"
    objects: {
      tournament: Prisma.$TournamentPayload<ExtArgs>
      match: Prisma.$MatchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tournamentId: number
      matchId: number
      roundNumber: number
      matchNumber: number
      player1Name: string
      player2Name: string
      winnerName: string | null
      isBye: boolean
    }, ExtArgs["result"]["tournamentMatch"]>
    composites: {}
  }

  type TournamentMatchGetPayload<S extends boolean | null | undefined | TournamentMatchDefaultArgs> = $Result.GetResult<Prisma.$TournamentMatchPayload, S>

  type TournamentMatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TournamentMatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TournamentMatchCountAggregateInputType | true
    }

  export interface TournamentMatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TournamentMatch'], meta: { name: 'TournamentMatch' } }
    /**
     * Find zero or one TournamentMatch that matches the filter.
     * @param {TournamentMatchFindUniqueArgs} args - Arguments to find a TournamentMatch
     * @example
     * // Get one TournamentMatch
     * const tournamentMatch = await prisma.tournamentMatch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TournamentMatchFindUniqueArgs>(args: SelectSubset<T, TournamentMatchFindUniqueArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TournamentMatch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TournamentMatchFindUniqueOrThrowArgs} args - Arguments to find a TournamentMatch
     * @example
     * // Get one TournamentMatch
     * const tournamentMatch = await prisma.tournamentMatch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TournamentMatchFindUniqueOrThrowArgs>(args: SelectSubset<T, TournamentMatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TournamentMatch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentMatchFindFirstArgs} args - Arguments to find a TournamentMatch
     * @example
     * // Get one TournamentMatch
     * const tournamentMatch = await prisma.tournamentMatch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TournamentMatchFindFirstArgs>(args?: SelectSubset<T, TournamentMatchFindFirstArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TournamentMatch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentMatchFindFirstOrThrowArgs} args - Arguments to find a TournamentMatch
     * @example
     * // Get one TournamentMatch
     * const tournamentMatch = await prisma.tournamentMatch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TournamentMatchFindFirstOrThrowArgs>(args?: SelectSubset<T, TournamentMatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TournamentMatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentMatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TournamentMatches
     * const tournamentMatches = await prisma.tournamentMatch.findMany()
     * 
     * // Get first 10 TournamentMatches
     * const tournamentMatches = await prisma.tournamentMatch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tournamentMatchWithIdOnly = await prisma.tournamentMatch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TournamentMatchFindManyArgs>(args?: SelectSubset<T, TournamentMatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TournamentMatch.
     * @param {TournamentMatchCreateArgs} args - Arguments to create a TournamentMatch.
     * @example
     * // Create one TournamentMatch
     * const TournamentMatch = await prisma.tournamentMatch.create({
     *   data: {
     *     // ... data to create a TournamentMatch
     *   }
     * })
     * 
     */
    create<T extends TournamentMatchCreateArgs>(args: SelectSubset<T, TournamentMatchCreateArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TournamentMatches.
     * @param {TournamentMatchCreateManyArgs} args - Arguments to create many TournamentMatches.
     * @example
     * // Create many TournamentMatches
     * const tournamentMatch = await prisma.tournamentMatch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TournamentMatchCreateManyArgs>(args?: SelectSubset<T, TournamentMatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TournamentMatches and returns the data saved in the database.
     * @param {TournamentMatchCreateManyAndReturnArgs} args - Arguments to create many TournamentMatches.
     * @example
     * // Create many TournamentMatches
     * const tournamentMatch = await prisma.tournamentMatch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TournamentMatches and only return the `id`
     * const tournamentMatchWithIdOnly = await prisma.tournamentMatch.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TournamentMatchCreateManyAndReturnArgs>(args?: SelectSubset<T, TournamentMatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TournamentMatch.
     * @param {TournamentMatchDeleteArgs} args - Arguments to delete one TournamentMatch.
     * @example
     * // Delete one TournamentMatch
     * const TournamentMatch = await prisma.tournamentMatch.delete({
     *   where: {
     *     // ... filter to delete one TournamentMatch
     *   }
     * })
     * 
     */
    delete<T extends TournamentMatchDeleteArgs>(args: SelectSubset<T, TournamentMatchDeleteArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TournamentMatch.
     * @param {TournamentMatchUpdateArgs} args - Arguments to update one TournamentMatch.
     * @example
     * // Update one TournamentMatch
     * const tournamentMatch = await prisma.tournamentMatch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TournamentMatchUpdateArgs>(args: SelectSubset<T, TournamentMatchUpdateArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TournamentMatches.
     * @param {TournamentMatchDeleteManyArgs} args - Arguments to filter TournamentMatches to delete.
     * @example
     * // Delete a few TournamentMatches
     * const { count } = await prisma.tournamentMatch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TournamentMatchDeleteManyArgs>(args?: SelectSubset<T, TournamentMatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TournamentMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentMatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TournamentMatches
     * const tournamentMatch = await prisma.tournamentMatch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TournamentMatchUpdateManyArgs>(args: SelectSubset<T, TournamentMatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TournamentMatches and returns the data updated in the database.
     * @param {TournamentMatchUpdateManyAndReturnArgs} args - Arguments to update many TournamentMatches.
     * @example
     * // Update many TournamentMatches
     * const tournamentMatch = await prisma.tournamentMatch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TournamentMatches and only return the `id`
     * const tournamentMatchWithIdOnly = await prisma.tournamentMatch.updateManyAndReturn({
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
    updateManyAndReturn<T extends TournamentMatchUpdateManyAndReturnArgs>(args: SelectSubset<T, TournamentMatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TournamentMatch.
     * @param {TournamentMatchUpsertArgs} args - Arguments to update or create a TournamentMatch.
     * @example
     * // Update or create a TournamentMatch
     * const tournamentMatch = await prisma.tournamentMatch.upsert({
     *   create: {
     *     // ... data to create a TournamentMatch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TournamentMatch we want to update
     *   }
     * })
     */
    upsert<T extends TournamentMatchUpsertArgs>(args: SelectSubset<T, TournamentMatchUpsertArgs<ExtArgs>>): Prisma__TournamentMatchClient<$Result.GetResult<Prisma.$TournamentMatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TournamentMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentMatchCountArgs} args - Arguments to filter TournamentMatches to count.
     * @example
     * // Count the number of TournamentMatches
     * const count = await prisma.tournamentMatch.count({
     *   where: {
     *     // ... the filter for the TournamentMatches we want to count
     *   }
     * })
    **/
    count<T extends TournamentMatchCountArgs>(
      args?: Subset<T, TournamentMatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TournamentMatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TournamentMatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentMatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TournamentMatchAggregateArgs>(args: Subset<T, TournamentMatchAggregateArgs>): Prisma.PrismaPromise<GetTournamentMatchAggregateType<T>>

    /**
     * Group by TournamentMatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentMatchGroupByArgs} args - Group by arguments.
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
      T extends TournamentMatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TournamentMatchGroupByArgs['orderBy'] }
        : { orderBy?: TournamentMatchGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TournamentMatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTournamentMatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TournamentMatch model
   */
  readonly fields: TournamentMatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TournamentMatch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TournamentMatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tournament<T extends TournamentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TournamentDefaultArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    match<T extends MatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MatchDefaultArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TournamentMatch model
   */
  interface TournamentMatchFieldRefs {
    readonly id: FieldRef<"TournamentMatch", 'Int'>
    readonly tournamentId: FieldRef<"TournamentMatch", 'Int'>
    readonly matchId: FieldRef<"TournamentMatch", 'Int'>
    readonly roundNumber: FieldRef<"TournamentMatch", 'Int'>
    readonly matchNumber: FieldRef<"TournamentMatch", 'Int'>
    readonly player1Name: FieldRef<"TournamentMatch", 'String'>
    readonly player2Name: FieldRef<"TournamentMatch", 'String'>
    readonly winnerName: FieldRef<"TournamentMatch", 'String'>
    readonly isBye: FieldRef<"TournamentMatch", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * TournamentMatch findUnique
   */
  export type TournamentMatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentMatch
     */
    omit?: TournamentMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * Filter, which TournamentMatch to fetch.
     */
    where: TournamentMatchWhereUniqueInput
  }

  /**
   * TournamentMatch findUniqueOrThrow
   */
  export type TournamentMatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentMatch
     */
    omit?: TournamentMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * Filter, which TournamentMatch to fetch.
     */
    where: TournamentMatchWhereUniqueInput
  }

  /**
   * TournamentMatch findFirst
   */
  export type TournamentMatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentMatch
     */
    omit?: TournamentMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * Filter, which TournamentMatch to fetch.
     */
    where?: TournamentMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentMatches to fetch.
     */
    orderBy?: TournamentMatchOrderByWithRelationInput | TournamentMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TournamentMatches.
     */
    cursor?: TournamentMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TournamentMatches.
     */
    distinct?: TournamentMatchScalarFieldEnum | TournamentMatchScalarFieldEnum[]
  }

  /**
   * TournamentMatch findFirstOrThrow
   */
  export type TournamentMatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentMatch
     */
    omit?: TournamentMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * Filter, which TournamentMatch to fetch.
     */
    where?: TournamentMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentMatches to fetch.
     */
    orderBy?: TournamentMatchOrderByWithRelationInput | TournamentMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TournamentMatches.
     */
    cursor?: TournamentMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TournamentMatches.
     */
    distinct?: TournamentMatchScalarFieldEnum | TournamentMatchScalarFieldEnum[]
  }

  /**
   * TournamentMatch findMany
   */
  export type TournamentMatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentMatch
     */
    omit?: TournamentMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * Filter, which TournamentMatches to fetch.
     */
    where?: TournamentMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentMatches to fetch.
     */
    orderBy?: TournamentMatchOrderByWithRelationInput | TournamentMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TournamentMatches.
     */
    cursor?: TournamentMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentMatches.
     */
    skip?: number
    distinct?: TournamentMatchScalarFieldEnum | TournamentMatchScalarFieldEnum[]
  }

  /**
   * TournamentMatch create
   */
  export type TournamentMatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentMatch
     */
    omit?: TournamentMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * The data needed to create a TournamentMatch.
     */
    data: XOR<TournamentMatchCreateInput, TournamentMatchUncheckedCreateInput>
  }

  /**
   * TournamentMatch createMany
   */
  export type TournamentMatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TournamentMatches.
     */
    data: TournamentMatchCreateManyInput | TournamentMatchCreateManyInput[]
  }

  /**
   * TournamentMatch createManyAndReturn
   */
  export type TournamentMatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentMatch
     */
    omit?: TournamentMatchOmit<ExtArgs> | null
    /**
     * The data used to create many TournamentMatches.
     */
    data: TournamentMatchCreateManyInput | TournamentMatchCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TournamentMatch update
   */
  export type TournamentMatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentMatch
     */
    omit?: TournamentMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * The data needed to update a TournamentMatch.
     */
    data: XOR<TournamentMatchUpdateInput, TournamentMatchUncheckedUpdateInput>
    /**
     * Choose, which TournamentMatch to update.
     */
    where: TournamentMatchWhereUniqueInput
  }

  /**
   * TournamentMatch updateMany
   */
  export type TournamentMatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TournamentMatches.
     */
    data: XOR<TournamentMatchUpdateManyMutationInput, TournamentMatchUncheckedUpdateManyInput>
    /**
     * Filter which TournamentMatches to update
     */
    where?: TournamentMatchWhereInput
    /**
     * Limit how many TournamentMatches to update.
     */
    limit?: number
  }

  /**
   * TournamentMatch updateManyAndReturn
   */
  export type TournamentMatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentMatch
     */
    omit?: TournamentMatchOmit<ExtArgs> | null
    /**
     * The data used to update TournamentMatches.
     */
    data: XOR<TournamentMatchUpdateManyMutationInput, TournamentMatchUncheckedUpdateManyInput>
    /**
     * Filter which TournamentMatches to update
     */
    where?: TournamentMatchWhereInput
    /**
     * Limit how many TournamentMatches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TournamentMatch upsert
   */
  export type TournamentMatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentMatch
     */
    omit?: TournamentMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * The filter to search for the TournamentMatch to update in case it exists.
     */
    where: TournamentMatchWhereUniqueInput
    /**
     * In case the TournamentMatch found by the `where` argument doesn't exist, create a new TournamentMatch with this data.
     */
    create: XOR<TournamentMatchCreateInput, TournamentMatchUncheckedCreateInput>
    /**
     * In case the TournamentMatch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TournamentMatchUpdateInput, TournamentMatchUncheckedUpdateInput>
  }

  /**
   * TournamentMatch delete
   */
  export type TournamentMatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentMatch
     */
    omit?: TournamentMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
    /**
     * Filter which TournamentMatch to delete.
     */
    where: TournamentMatchWhereUniqueInput
  }

  /**
   * TournamentMatch deleteMany
   */
  export type TournamentMatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TournamentMatches to delete
     */
    where?: TournamentMatchWhereInput
    /**
     * Limit how many TournamentMatches to delete.
     */
    limit?: number
  }

  /**
   * TournamentMatch without action
   */
  export type TournamentMatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentMatch
     */
    select?: TournamentMatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentMatch
     */
    omit?: TournamentMatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentMatchInclude<ExtArgs> | null
  }


  /**
   * Model TournamentPlayer
   */

  export type AggregateTournamentPlayer = {
    _count: TournamentPlayerCountAggregateOutputType | null
    _avg: TournamentPlayerAvgAggregateOutputType | null
    _sum: TournamentPlayerSumAggregateOutputType | null
    _min: TournamentPlayerMinAggregateOutputType | null
    _max: TournamentPlayerMaxAggregateOutputType | null
  }

  export type TournamentPlayerAvgAggregateOutputType = {
    id: number | null
    tournamentId: number | null
    seed: number | null
  }

  export type TournamentPlayerSumAggregateOutputType = {
    id: number | null
    tournamentId: number | null
    seed: number | null
  }

  export type TournamentPlayerMinAggregateOutputType = {
    id: number | null
    tournamentId: number | null
    playerName: string | null
    isUser: boolean | null
    seed: number | null
  }

  export type TournamentPlayerMaxAggregateOutputType = {
    id: number | null
    tournamentId: number | null
    playerName: string | null
    isUser: boolean | null
    seed: number | null
  }

  export type TournamentPlayerCountAggregateOutputType = {
    id: number
    tournamentId: number
    playerName: number
    isUser: number
    seed: number
    _all: number
  }


  export type TournamentPlayerAvgAggregateInputType = {
    id?: true
    tournamentId?: true
    seed?: true
  }

  export type TournamentPlayerSumAggregateInputType = {
    id?: true
    tournamentId?: true
    seed?: true
  }

  export type TournamentPlayerMinAggregateInputType = {
    id?: true
    tournamentId?: true
    playerName?: true
    isUser?: true
    seed?: true
  }

  export type TournamentPlayerMaxAggregateInputType = {
    id?: true
    tournamentId?: true
    playerName?: true
    isUser?: true
    seed?: true
  }

  export type TournamentPlayerCountAggregateInputType = {
    id?: true
    tournamentId?: true
    playerName?: true
    isUser?: true
    seed?: true
    _all?: true
  }

  export type TournamentPlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TournamentPlayer to aggregate.
     */
    where?: TournamentPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentPlayers to fetch.
     */
    orderBy?: TournamentPlayerOrderByWithRelationInput | TournamentPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TournamentPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TournamentPlayers
    **/
    _count?: true | TournamentPlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TournamentPlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TournamentPlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TournamentPlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TournamentPlayerMaxAggregateInputType
  }

  export type GetTournamentPlayerAggregateType<T extends TournamentPlayerAggregateArgs> = {
        [P in keyof T & keyof AggregateTournamentPlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTournamentPlayer[P]>
      : GetScalarType<T[P], AggregateTournamentPlayer[P]>
  }




  export type TournamentPlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentPlayerWhereInput
    orderBy?: TournamentPlayerOrderByWithAggregationInput | TournamentPlayerOrderByWithAggregationInput[]
    by: TournamentPlayerScalarFieldEnum[] | TournamentPlayerScalarFieldEnum
    having?: TournamentPlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TournamentPlayerCountAggregateInputType | true
    _avg?: TournamentPlayerAvgAggregateInputType
    _sum?: TournamentPlayerSumAggregateInputType
    _min?: TournamentPlayerMinAggregateInputType
    _max?: TournamentPlayerMaxAggregateInputType
  }

  export type TournamentPlayerGroupByOutputType = {
    id: number
    tournamentId: number
    playerName: string
    isUser: boolean
    seed: number | null
    _count: TournamentPlayerCountAggregateOutputType | null
    _avg: TournamentPlayerAvgAggregateOutputType | null
    _sum: TournamentPlayerSumAggregateOutputType | null
    _min: TournamentPlayerMinAggregateOutputType | null
    _max: TournamentPlayerMaxAggregateOutputType | null
  }

  type GetTournamentPlayerGroupByPayload<T extends TournamentPlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TournamentPlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TournamentPlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TournamentPlayerGroupByOutputType[P]>
            : GetScalarType<T[P], TournamentPlayerGroupByOutputType[P]>
        }
      >
    >


  export type TournamentPlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentId?: boolean
    playerName?: boolean
    isUser?: boolean
    seed?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournamentPlayer"]>

  export type TournamentPlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentId?: boolean
    playerName?: boolean
    isUser?: boolean
    seed?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournamentPlayer"]>

  export type TournamentPlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentId?: boolean
    playerName?: boolean
    isUser?: boolean
    seed?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournamentPlayer"]>

  export type TournamentPlayerSelectScalar = {
    id?: boolean
    tournamentId?: boolean
    playerName?: boolean
    isUser?: boolean
    seed?: boolean
  }

  export type TournamentPlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tournamentId" | "playerName" | "isUser" | "seed", ExtArgs["result"]["tournamentPlayer"]>
  export type TournamentPlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }
  export type TournamentPlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }
  export type TournamentPlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }

  export type $TournamentPlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TournamentPlayer"
    objects: {
      tournament: Prisma.$TournamentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tournamentId: number
      playerName: string
      isUser: boolean
      seed: number | null
    }, ExtArgs["result"]["tournamentPlayer"]>
    composites: {}
  }

  type TournamentPlayerGetPayload<S extends boolean | null | undefined | TournamentPlayerDefaultArgs> = $Result.GetResult<Prisma.$TournamentPlayerPayload, S>

  type TournamentPlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TournamentPlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TournamentPlayerCountAggregateInputType | true
    }

  export interface TournamentPlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TournamentPlayer'], meta: { name: 'TournamentPlayer' } }
    /**
     * Find zero or one TournamentPlayer that matches the filter.
     * @param {TournamentPlayerFindUniqueArgs} args - Arguments to find a TournamentPlayer
     * @example
     * // Get one TournamentPlayer
     * const tournamentPlayer = await prisma.tournamentPlayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TournamentPlayerFindUniqueArgs>(args: SelectSubset<T, TournamentPlayerFindUniqueArgs<ExtArgs>>): Prisma__TournamentPlayerClient<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TournamentPlayer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TournamentPlayerFindUniqueOrThrowArgs} args - Arguments to find a TournamentPlayer
     * @example
     * // Get one TournamentPlayer
     * const tournamentPlayer = await prisma.tournamentPlayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TournamentPlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, TournamentPlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TournamentPlayerClient<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TournamentPlayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentPlayerFindFirstArgs} args - Arguments to find a TournamentPlayer
     * @example
     * // Get one TournamentPlayer
     * const tournamentPlayer = await prisma.tournamentPlayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TournamentPlayerFindFirstArgs>(args?: SelectSubset<T, TournamentPlayerFindFirstArgs<ExtArgs>>): Prisma__TournamentPlayerClient<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TournamentPlayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentPlayerFindFirstOrThrowArgs} args - Arguments to find a TournamentPlayer
     * @example
     * // Get one TournamentPlayer
     * const tournamentPlayer = await prisma.tournamentPlayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TournamentPlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, TournamentPlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__TournamentPlayerClient<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TournamentPlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentPlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TournamentPlayers
     * const tournamentPlayers = await prisma.tournamentPlayer.findMany()
     * 
     * // Get first 10 TournamentPlayers
     * const tournamentPlayers = await prisma.tournamentPlayer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tournamentPlayerWithIdOnly = await prisma.tournamentPlayer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TournamentPlayerFindManyArgs>(args?: SelectSubset<T, TournamentPlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TournamentPlayer.
     * @param {TournamentPlayerCreateArgs} args - Arguments to create a TournamentPlayer.
     * @example
     * // Create one TournamentPlayer
     * const TournamentPlayer = await prisma.tournamentPlayer.create({
     *   data: {
     *     // ... data to create a TournamentPlayer
     *   }
     * })
     * 
     */
    create<T extends TournamentPlayerCreateArgs>(args: SelectSubset<T, TournamentPlayerCreateArgs<ExtArgs>>): Prisma__TournamentPlayerClient<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TournamentPlayers.
     * @param {TournamentPlayerCreateManyArgs} args - Arguments to create many TournamentPlayers.
     * @example
     * // Create many TournamentPlayers
     * const tournamentPlayer = await prisma.tournamentPlayer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TournamentPlayerCreateManyArgs>(args?: SelectSubset<T, TournamentPlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TournamentPlayers and returns the data saved in the database.
     * @param {TournamentPlayerCreateManyAndReturnArgs} args - Arguments to create many TournamentPlayers.
     * @example
     * // Create many TournamentPlayers
     * const tournamentPlayer = await prisma.tournamentPlayer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TournamentPlayers and only return the `id`
     * const tournamentPlayerWithIdOnly = await prisma.tournamentPlayer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TournamentPlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, TournamentPlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TournamentPlayer.
     * @param {TournamentPlayerDeleteArgs} args - Arguments to delete one TournamentPlayer.
     * @example
     * // Delete one TournamentPlayer
     * const TournamentPlayer = await prisma.tournamentPlayer.delete({
     *   where: {
     *     // ... filter to delete one TournamentPlayer
     *   }
     * })
     * 
     */
    delete<T extends TournamentPlayerDeleteArgs>(args: SelectSubset<T, TournamentPlayerDeleteArgs<ExtArgs>>): Prisma__TournamentPlayerClient<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TournamentPlayer.
     * @param {TournamentPlayerUpdateArgs} args - Arguments to update one TournamentPlayer.
     * @example
     * // Update one TournamentPlayer
     * const tournamentPlayer = await prisma.tournamentPlayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TournamentPlayerUpdateArgs>(args: SelectSubset<T, TournamentPlayerUpdateArgs<ExtArgs>>): Prisma__TournamentPlayerClient<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TournamentPlayers.
     * @param {TournamentPlayerDeleteManyArgs} args - Arguments to filter TournamentPlayers to delete.
     * @example
     * // Delete a few TournamentPlayers
     * const { count } = await prisma.tournamentPlayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TournamentPlayerDeleteManyArgs>(args?: SelectSubset<T, TournamentPlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TournamentPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentPlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TournamentPlayers
     * const tournamentPlayer = await prisma.tournamentPlayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TournamentPlayerUpdateManyArgs>(args: SelectSubset<T, TournamentPlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TournamentPlayers and returns the data updated in the database.
     * @param {TournamentPlayerUpdateManyAndReturnArgs} args - Arguments to update many TournamentPlayers.
     * @example
     * // Update many TournamentPlayers
     * const tournamentPlayer = await prisma.tournamentPlayer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TournamentPlayers and only return the `id`
     * const tournamentPlayerWithIdOnly = await prisma.tournamentPlayer.updateManyAndReturn({
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
    updateManyAndReturn<T extends TournamentPlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, TournamentPlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TournamentPlayer.
     * @param {TournamentPlayerUpsertArgs} args - Arguments to update or create a TournamentPlayer.
     * @example
     * // Update or create a TournamentPlayer
     * const tournamentPlayer = await prisma.tournamentPlayer.upsert({
     *   create: {
     *     // ... data to create a TournamentPlayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TournamentPlayer we want to update
     *   }
     * })
     */
    upsert<T extends TournamentPlayerUpsertArgs>(args: SelectSubset<T, TournamentPlayerUpsertArgs<ExtArgs>>): Prisma__TournamentPlayerClient<$Result.GetResult<Prisma.$TournamentPlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TournamentPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentPlayerCountArgs} args - Arguments to filter TournamentPlayers to count.
     * @example
     * // Count the number of TournamentPlayers
     * const count = await prisma.tournamentPlayer.count({
     *   where: {
     *     // ... the filter for the TournamentPlayers we want to count
     *   }
     * })
    **/
    count<T extends TournamentPlayerCountArgs>(
      args?: Subset<T, TournamentPlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TournamentPlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TournamentPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentPlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TournamentPlayerAggregateArgs>(args: Subset<T, TournamentPlayerAggregateArgs>): Prisma.PrismaPromise<GetTournamentPlayerAggregateType<T>>

    /**
     * Group by TournamentPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentPlayerGroupByArgs} args - Group by arguments.
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
      T extends TournamentPlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TournamentPlayerGroupByArgs['orderBy'] }
        : { orderBy?: TournamentPlayerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TournamentPlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTournamentPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TournamentPlayer model
   */
  readonly fields: TournamentPlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TournamentPlayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TournamentPlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tournament<T extends TournamentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TournamentDefaultArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TournamentPlayer model
   */
  interface TournamentPlayerFieldRefs {
    readonly id: FieldRef<"TournamentPlayer", 'Int'>
    readonly tournamentId: FieldRef<"TournamentPlayer", 'Int'>
    readonly playerName: FieldRef<"TournamentPlayer", 'String'>
    readonly isUser: FieldRef<"TournamentPlayer", 'Boolean'>
    readonly seed: FieldRef<"TournamentPlayer", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TournamentPlayer findUnique
   */
  export type TournamentPlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentPlayer
     */
    omit?: TournamentPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * Filter, which TournamentPlayer to fetch.
     */
    where: TournamentPlayerWhereUniqueInput
  }

  /**
   * TournamentPlayer findUniqueOrThrow
   */
  export type TournamentPlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentPlayer
     */
    omit?: TournamentPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * Filter, which TournamentPlayer to fetch.
     */
    where: TournamentPlayerWhereUniqueInput
  }

  /**
   * TournamentPlayer findFirst
   */
  export type TournamentPlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentPlayer
     */
    omit?: TournamentPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * Filter, which TournamentPlayer to fetch.
     */
    where?: TournamentPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentPlayers to fetch.
     */
    orderBy?: TournamentPlayerOrderByWithRelationInput | TournamentPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TournamentPlayers.
     */
    cursor?: TournamentPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TournamentPlayers.
     */
    distinct?: TournamentPlayerScalarFieldEnum | TournamentPlayerScalarFieldEnum[]
  }

  /**
   * TournamentPlayer findFirstOrThrow
   */
  export type TournamentPlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentPlayer
     */
    omit?: TournamentPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * Filter, which TournamentPlayer to fetch.
     */
    where?: TournamentPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentPlayers to fetch.
     */
    orderBy?: TournamentPlayerOrderByWithRelationInput | TournamentPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TournamentPlayers.
     */
    cursor?: TournamentPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TournamentPlayers.
     */
    distinct?: TournamentPlayerScalarFieldEnum | TournamentPlayerScalarFieldEnum[]
  }

  /**
   * TournamentPlayer findMany
   */
  export type TournamentPlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentPlayer
     */
    omit?: TournamentPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * Filter, which TournamentPlayers to fetch.
     */
    where?: TournamentPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentPlayers to fetch.
     */
    orderBy?: TournamentPlayerOrderByWithRelationInput | TournamentPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TournamentPlayers.
     */
    cursor?: TournamentPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentPlayers.
     */
    skip?: number
    distinct?: TournamentPlayerScalarFieldEnum | TournamentPlayerScalarFieldEnum[]
  }

  /**
   * TournamentPlayer create
   */
  export type TournamentPlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentPlayer
     */
    omit?: TournamentPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a TournamentPlayer.
     */
    data: XOR<TournamentPlayerCreateInput, TournamentPlayerUncheckedCreateInput>
  }

  /**
   * TournamentPlayer createMany
   */
  export type TournamentPlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TournamentPlayers.
     */
    data: TournamentPlayerCreateManyInput | TournamentPlayerCreateManyInput[]
  }

  /**
   * TournamentPlayer createManyAndReturn
   */
  export type TournamentPlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentPlayer
     */
    omit?: TournamentPlayerOmit<ExtArgs> | null
    /**
     * The data used to create many TournamentPlayers.
     */
    data: TournamentPlayerCreateManyInput | TournamentPlayerCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TournamentPlayer update
   */
  export type TournamentPlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentPlayer
     */
    omit?: TournamentPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a TournamentPlayer.
     */
    data: XOR<TournamentPlayerUpdateInput, TournamentPlayerUncheckedUpdateInput>
    /**
     * Choose, which TournamentPlayer to update.
     */
    where: TournamentPlayerWhereUniqueInput
  }

  /**
   * TournamentPlayer updateMany
   */
  export type TournamentPlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TournamentPlayers.
     */
    data: XOR<TournamentPlayerUpdateManyMutationInput, TournamentPlayerUncheckedUpdateManyInput>
    /**
     * Filter which TournamentPlayers to update
     */
    where?: TournamentPlayerWhereInput
    /**
     * Limit how many TournamentPlayers to update.
     */
    limit?: number
  }

  /**
   * TournamentPlayer updateManyAndReturn
   */
  export type TournamentPlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentPlayer
     */
    omit?: TournamentPlayerOmit<ExtArgs> | null
    /**
     * The data used to update TournamentPlayers.
     */
    data: XOR<TournamentPlayerUpdateManyMutationInput, TournamentPlayerUncheckedUpdateManyInput>
    /**
     * Filter which TournamentPlayers to update
     */
    where?: TournamentPlayerWhereInput
    /**
     * Limit how many TournamentPlayers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TournamentPlayer upsert
   */
  export type TournamentPlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentPlayer
     */
    omit?: TournamentPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the TournamentPlayer to update in case it exists.
     */
    where: TournamentPlayerWhereUniqueInput
    /**
     * In case the TournamentPlayer found by the `where` argument doesn't exist, create a new TournamentPlayer with this data.
     */
    create: XOR<TournamentPlayerCreateInput, TournamentPlayerUncheckedCreateInput>
    /**
     * In case the TournamentPlayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TournamentPlayerUpdateInput, TournamentPlayerUncheckedUpdateInput>
  }

  /**
   * TournamentPlayer delete
   */
  export type TournamentPlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentPlayer
     */
    omit?: TournamentPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
    /**
     * Filter which TournamentPlayer to delete.
     */
    where: TournamentPlayerWhereUniqueInput
  }

  /**
   * TournamentPlayer deleteMany
   */
  export type TournamentPlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TournamentPlayers to delete
     */
    where?: TournamentPlayerWhereInput
    /**
     * Limit how many TournamentPlayers to delete.
     */
    limit?: number
  }

  /**
   * TournamentPlayer without action
   */
  export type TournamentPlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentPlayer
     */
    select?: TournamentPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentPlayer
     */
    omit?: TournamentPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentPlayerInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    google_id: 'google_id',
    username: 'username',
    email: 'email',
    password: 'password',
    avatar_url: 'avatar_url',
    display_name: 'display_name',
    created_at: 'created_at',
    updated_at: 'updated_at',
    totp_secret: 'totp_secret'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FriendScalarFieldEnum: {
    id: 'id',
    senderId: 'senderId',
    receiverId: 'receiverId',
    status: 'status',
    onlineStatus: 'onlineStatus',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type FriendScalarFieldEnum = (typeof FriendScalarFieldEnum)[keyof typeof FriendScalarFieldEnum]


  export const MatchScalarFieldEnum: {
    id: 'id',
    player1Id: 'player1Id',
    player2Name: 'player2Name',
    winnerId: 'winnerId',
    winnerName: 'winnerName',
    score_p1: 'score_p1',
    score_p2: 'score_p2',
    gameType: 'gameType',
    played_at: 'played_at'
  };

  export type MatchScalarFieldEnum = (typeof MatchScalarFieldEnum)[keyof typeof MatchScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    senderId: 'senderId',
    receiverId: 'receiverId',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    status: 'status'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const TournamentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    status: 'status',
    createdById: 'createdById',
    winnerName: 'winnerName',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TournamentScalarFieldEnum = (typeof TournamentScalarFieldEnum)[keyof typeof TournamentScalarFieldEnum]


  export const TournamentMatchScalarFieldEnum: {
    id: 'id',
    tournamentId: 'tournamentId',
    matchId: 'matchId',
    roundNumber: 'roundNumber',
    matchNumber: 'matchNumber',
    player1Name: 'player1Name',
    player2Name: 'player2Name',
    winnerName: 'winnerName',
    isBye: 'isBye'
  };

  export type TournamentMatchScalarFieldEnum = (typeof TournamentMatchScalarFieldEnum)[keyof typeof TournamentMatchScalarFieldEnum]


  export const TournamentPlayerScalarFieldEnum: {
    id: 'id',
    tournamentId: 'tournamentId',
    playerName: 'playerName',
    isUser: 'isUser',
    seed: 'seed'
  };

  export type TournamentPlayerScalarFieldEnum = (typeof TournamentPlayerScalarFieldEnum)[keyof typeof TournamentPlayerScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'FriendStatus'
   */
  export type EnumFriendStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FriendStatus'>
    


  /**
   * Reference to a field of type 'OnlineStatus'
   */
  export type EnumOnlineStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OnlineStatus'>
    


  /**
   * Reference to a field of type 'MessageStatus'
   */
  export type EnumMessageStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageStatus'>
    


  /**
   * Reference to a field of type 'TournamentStatus'
   */
  export type EnumTournamentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TournamentStatus'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    google_id?: StringNullableFilter<"User"> | string | null
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    avatar_url?: StringNullableFilter<"User"> | string | null
    display_name?: StringNullableFilter<"User"> | string | null
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    totp_secret?: StringNullableFilter<"User"> | string | null
    friendsSent?: FriendListRelationFilter
    friendsReceived?: FriendListRelationFilter
    matchesAsPlayer1?: MatchListRelationFilter
    matchesWon?: MatchListRelationFilter
    sentMessages?: MessageListRelationFilter
    receivedMessages?: MessageListRelationFilter
    createdTournaments?: TournamentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    google_id?: SortOrderInput | SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    avatar_url?: SortOrderInput | SortOrder
    display_name?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    totp_secret?: SortOrderInput | SortOrder
    friendsSent?: FriendOrderByRelationAggregateInput
    friendsReceived?: FriendOrderByRelationAggregateInput
    matchesAsPlayer1?: MatchOrderByRelationAggregateInput
    matchesWon?: MatchOrderByRelationAggregateInput
    sentMessages?: MessageOrderByRelationAggregateInput
    receivedMessages?: MessageOrderByRelationAggregateInput
    createdTournaments?: TournamentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    google_id?: string
    username?: string
    email?: string
    totp_secret?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    avatar_url?: StringNullableFilter<"User"> | string | null
    display_name?: StringNullableFilter<"User"> | string | null
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    friendsSent?: FriendListRelationFilter
    friendsReceived?: FriendListRelationFilter
    matchesAsPlayer1?: MatchListRelationFilter
    matchesWon?: MatchListRelationFilter
    sentMessages?: MessageListRelationFilter
    receivedMessages?: MessageListRelationFilter
    createdTournaments?: TournamentListRelationFilter
  }, "id" | "google_id" | "username" | "email" | "totp_secret">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    google_id?: SortOrderInput | SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    avatar_url?: SortOrderInput | SortOrder
    display_name?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    totp_secret?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    google_id?: StringNullableWithAggregatesFilter<"User"> | string | null
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar_url?: StringNullableWithAggregatesFilter<"User"> | string | null
    display_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    totp_secret?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type FriendWhereInput = {
    AND?: FriendWhereInput | FriendWhereInput[]
    OR?: FriendWhereInput[]
    NOT?: FriendWhereInput | FriendWhereInput[]
    id?: IntFilter<"Friend"> | number
    senderId?: IntFilter<"Friend"> | number
    receiverId?: IntFilter<"Friend"> | number
    status?: EnumFriendStatusFilter<"Friend"> | $Enums.FriendStatus
    onlineStatus?: EnumOnlineStatusFilter<"Friend"> | $Enums.OnlineStatus
    created_at?: DateTimeFilter<"Friend"> | Date | string
    updated_at?: DateTimeFilter<"Friend"> | Date | string
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FriendOrderByWithRelationInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    onlineStatus?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    sender?: UserOrderByWithRelationInput
    receiver?: UserOrderByWithRelationInput
  }

  export type FriendWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    senderId_receiverId?: FriendSenderIdReceiverIdCompoundUniqueInput
    AND?: FriendWhereInput | FriendWhereInput[]
    OR?: FriendWhereInput[]
    NOT?: FriendWhereInput | FriendWhereInput[]
    senderId?: IntFilter<"Friend"> | number
    receiverId?: IntFilter<"Friend"> | number
    status?: EnumFriendStatusFilter<"Friend"> | $Enums.FriendStatus
    onlineStatus?: EnumOnlineStatusFilter<"Friend"> | $Enums.OnlineStatus
    created_at?: DateTimeFilter<"Friend"> | Date | string
    updated_at?: DateTimeFilter<"Friend"> | Date | string
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "senderId_receiverId">

  export type FriendOrderByWithAggregationInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    onlineStatus?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: FriendCountOrderByAggregateInput
    _avg?: FriendAvgOrderByAggregateInput
    _max?: FriendMaxOrderByAggregateInput
    _min?: FriendMinOrderByAggregateInput
    _sum?: FriendSumOrderByAggregateInput
  }

  export type FriendScalarWhereWithAggregatesInput = {
    AND?: FriendScalarWhereWithAggregatesInput | FriendScalarWhereWithAggregatesInput[]
    OR?: FriendScalarWhereWithAggregatesInput[]
    NOT?: FriendScalarWhereWithAggregatesInput | FriendScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Friend"> | number
    senderId?: IntWithAggregatesFilter<"Friend"> | number
    receiverId?: IntWithAggregatesFilter<"Friend"> | number
    status?: EnumFriendStatusWithAggregatesFilter<"Friend"> | $Enums.FriendStatus
    onlineStatus?: EnumOnlineStatusWithAggregatesFilter<"Friend"> | $Enums.OnlineStatus
    created_at?: DateTimeWithAggregatesFilter<"Friend"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Friend"> | Date | string
  }

  export type MatchWhereInput = {
    AND?: MatchWhereInput | MatchWhereInput[]
    OR?: MatchWhereInput[]
    NOT?: MatchWhereInput | MatchWhereInput[]
    id?: IntFilter<"Match"> | number
    player1Id?: IntFilter<"Match"> | number
    player2Name?: StringFilter<"Match"> | string
    winnerId?: IntNullableFilter<"Match"> | number | null
    winnerName?: StringFilter<"Match"> | string
    score_p1?: IntFilter<"Match"> | number
    score_p2?: IntFilter<"Match"> | number
    gameType?: StringFilter<"Match"> | string
    played_at?: DateTimeFilter<"Match"> | Date | string
    player1?: XOR<UserScalarRelationFilter, UserWhereInput>
    winner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    tournamentMatch?: XOR<TournamentMatchNullableScalarRelationFilter, TournamentMatchWhereInput> | null
  }

  export type MatchOrderByWithRelationInput = {
    id?: SortOrder
    player1Id?: SortOrder
    player2Name?: SortOrder
    winnerId?: SortOrderInput | SortOrder
    winnerName?: SortOrder
    score_p1?: SortOrder
    score_p2?: SortOrder
    gameType?: SortOrder
    played_at?: SortOrder
    player1?: UserOrderByWithRelationInput
    winner?: UserOrderByWithRelationInput
    tournamentMatch?: TournamentMatchOrderByWithRelationInput
  }

  export type MatchWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MatchWhereInput | MatchWhereInput[]
    OR?: MatchWhereInput[]
    NOT?: MatchWhereInput | MatchWhereInput[]
    player1Id?: IntFilter<"Match"> | number
    player2Name?: StringFilter<"Match"> | string
    winnerId?: IntNullableFilter<"Match"> | number | null
    winnerName?: StringFilter<"Match"> | string
    score_p1?: IntFilter<"Match"> | number
    score_p2?: IntFilter<"Match"> | number
    gameType?: StringFilter<"Match"> | string
    played_at?: DateTimeFilter<"Match"> | Date | string
    player1?: XOR<UserScalarRelationFilter, UserWhereInput>
    winner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    tournamentMatch?: XOR<TournamentMatchNullableScalarRelationFilter, TournamentMatchWhereInput> | null
  }, "id">

  export type MatchOrderByWithAggregationInput = {
    id?: SortOrder
    player1Id?: SortOrder
    player2Name?: SortOrder
    winnerId?: SortOrderInput | SortOrder
    winnerName?: SortOrder
    score_p1?: SortOrder
    score_p2?: SortOrder
    gameType?: SortOrder
    played_at?: SortOrder
    _count?: MatchCountOrderByAggregateInput
    _avg?: MatchAvgOrderByAggregateInput
    _max?: MatchMaxOrderByAggregateInput
    _min?: MatchMinOrderByAggregateInput
    _sum?: MatchSumOrderByAggregateInput
  }

  export type MatchScalarWhereWithAggregatesInput = {
    AND?: MatchScalarWhereWithAggregatesInput | MatchScalarWhereWithAggregatesInput[]
    OR?: MatchScalarWhereWithAggregatesInput[]
    NOT?: MatchScalarWhereWithAggregatesInput | MatchScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Match"> | number
    player1Id?: IntWithAggregatesFilter<"Match"> | number
    player2Name?: StringWithAggregatesFilter<"Match"> | string
    winnerId?: IntNullableWithAggregatesFilter<"Match"> | number | null
    winnerName?: StringWithAggregatesFilter<"Match"> | string
    score_p1?: IntWithAggregatesFilter<"Match"> | number
    score_p2?: IntWithAggregatesFilter<"Match"> | number
    gameType?: StringWithAggregatesFilter<"Match"> | string
    played_at?: DateTimeWithAggregatesFilter<"Match"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: IntFilter<"Message"> | number
    senderId?: IntFilter<"Message"> | number
    receiverId?: IntFilter<"Message"> | number
    content?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    status?: EnumMessageStatusFilter<"Message"> | $Enums.MessageStatus
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    status?: SortOrder
    sender?: UserOrderByWithRelationInput
    receiver?: UserOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    senderId?: IntFilter<"Message"> | number
    receiverId?: IntFilter<"Message"> | number
    content?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    status?: EnumMessageStatusFilter<"Message"> | $Enums.MessageStatus
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    status?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _avg?: MessageAvgOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
    _sum?: MessageSumOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Message"> | number
    senderId?: IntWithAggregatesFilter<"Message"> | number
    receiverId?: IntWithAggregatesFilter<"Message"> | number
    content?: StringWithAggregatesFilter<"Message"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    status?: EnumMessageStatusWithAggregatesFilter<"Message"> | $Enums.MessageStatus
  }

  export type TournamentWhereInput = {
    AND?: TournamentWhereInput | TournamentWhereInput[]
    OR?: TournamentWhereInput[]
    NOT?: TournamentWhereInput | TournamentWhereInput[]
    id?: IntFilter<"Tournament"> | number
    name?: StringFilter<"Tournament"> | string
    status?: EnumTournamentStatusFilter<"Tournament"> | $Enums.TournamentStatus
    createdById?: IntFilter<"Tournament"> | number
    winnerName?: StringNullableFilter<"Tournament"> | string | null
    createdAt?: DateTimeFilter<"Tournament"> | Date | string
    updatedAt?: DateTimeFilter<"Tournament"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    players?: TournamentPlayerListRelationFilter
    matches?: TournamentMatchListRelationFilter
  }

  export type TournamentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    createdById?: SortOrder
    winnerName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    players?: TournamentPlayerOrderByRelationAggregateInput
    matches?: TournamentMatchOrderByRelationAggregateInput
  }

  export type TournamentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TournamentWhereInput | TournamentWhereInput[]
    OR?: TournamentWhereInput[]
    NOT?: TournamentWhereInput | TournamentWhereInput[]
    name?: StringFilter<"Tournament"> | string
    status?: EnumTournamentStatusFilter<"Tournament"> | $Enums.TournamentStatus
    createdById?: IntFilter<"Tournament"> | number
    winnerName?: StringNullableFilter<"Tournament"> | string | null
    createdAt?: DateTimeFilter<"Tournament"> | Date | string
    updatedAt?: DateTimeFilter<"Tournament"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    players?: TournamentPlayerListRelationFilter
    matches?: TournamentMatchListRelationFilter
  }, "id">

  export type TournamentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    createdById?: SortOrder
    winnerName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TournamentCountOrderByAggregateInput
    _avg?: TournamentAvgOrderByAggregateInput
    _max?: TournamentMaxOrderByAggregateInput
    _min?: TournamentMinOrderByAggregateInput
    _sum?: TournamentSumOrderByAggregateInput
  }

  export type TournamentScalarWhereWithAggregatesInput = {
    AND?: TournamentScalarWhereWithAggregatesInput | TournamentScalarWhereWithAggregatesInput[]
    OR?: TournamentScalarWhereWithAggregatesInput[]
    NOT?: TournamentScalarWhereWithAggregatesInput | TournamentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Tournament"> | number
    name?: StringWithAggregatesFilter<"Tournament"> | string
    status?: EnumTournamentStatusWithAggregatesFilter<"Tournament"> | $Enums.TournamentStatus
    createdById?: IntWithAggregatesFilter<"Tournament"> | number
    winnerName?: StringNullableWithAggregatesFilter<"Tournament"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tournament"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tournament"> | Date | string
  }

  export type TournamentMatchWhereInput = {
    AND?: TournamentMatchWhereInput | TournamentMatchWhereInput[]
    OR?: TournamentMatchWhereInput[]
    NOT?: TournamentMatchWhereInput | TournamentMatchWhereInput[]
    id?: IntFilter<"TournamentMatch"> | number
    tournamentId?: IntFilter<"TournamentMatch"> | number
    matchId?: IntFilter<"TournamentMatch"> | number
    roundNumber?: IntFilter<"TournamentMatch"> | number
    matchNumber?: IntFilter<"TournamentMatch"> | number
    player1Name?: StringFilter<"TournamentMatch"> | string
    player2Name?: StringFilter<"TournamentMatch"> | string
    winnerName?: StringNullableFilter<"TournamentMatch"> | string | null
    isBye?: BoolFilter<"TournamentMatch"> | boolean
    tournament?: XOR<TournamentScalarRelationFilter, TournamentWhereInput>
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
  }

  export type TournamentMatchOrderByWithRelationInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    matchId?: SortOrder
    roundNumber?: SortOrder
    matchNumber?: SortOrder
    player1Name?: SortOrder
    player2Name?: SortOrder
    winnerName?: SortOrderInput | SortOrder
    isBye?: SortOrder
    tournament?: TournamentOrderByWithRelationInput
    match?: MatchOrderByWithRelationInput
  }

  export type TournamentMatchWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    matchId?: number
    AND?: TournamentMatchWhereInput | TournamentMatchWhereInput[]
    OR?: TournamentMatchWhereInput[]
    NOT?: TournamentMatchWhereInput | TournamentMatchWhereInput[]
    tournamentId?: IntFilter<"TournamentMatch"> | number
    roundNumber?: IntFilter<"TournamentMatch"> | number
    matchNumber?: IntFilter<"TournamentMatch"> | number
    player1Name?: StringFilter<"TournamentMatch"> | string
    player2Name?: StringFilter<"TournamentMatch"> | string
    winnerName?: StringNullableFilter<"TournamentMatch"> | string | null
    isBye?: BoolFilter<"TournamentMatch"> | boolean
    tournament?: XOR<TournamentScalarRelationFilter, TournamentWhereInput>
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
  }, "id" | "matchId">

  export type TournamentMatchOrderByWithAggregationInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    matchId?: SortOrder
    roundNumber?: SortOrder
    matchNumber?: SortOrder
    player1Name?: SortOrder
    player2Name?: SortOrder
    winnerName?: SortOrderInput | SortOrder
    isBye?: SortOrder
    _count?: TournamentMatchCountOrderByAggregateInput
    _avg?: TournamentMatchAvgOrderByAggregateInput
    _max?: TournamentMatchMaxOrderByAggregateInput
    _min?: TournamentMatchMinOrderByAggregateInput
    _sum?: TournamentMatchSumOrderByAggregateInput
  }

  export type TournamentMatchScalarWhereWithAggregatesInput = {
    AND?: TournamentMatchScalarWhereWithAggregatesInput | TournamentMatchScalarWhereWithAggregatesInput[]
    OR?: TournamentMatchScalarWhereWithAggregatesInput[]
    NOT?: TournamentMatchScalarWhereWithAggregatesInput | TournamentMatchScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TournamentMatch"> | number
    tournamentId?: IntWithAggregatesFilter<"TournamentMatch"> | number
    matchId?: IntWithAggregatesFilter<"TournamentMatch"> | number
    roundNumber?: IntWithAggregatesFilter<"TournamentMatch"> | number
    matchNumber?: IntWithAggregatesFilter<"TournamentMatch"> | number
    player1Name?: StringWithAggregatesFilter<"TournamentMatch"> | string
    player2Name?: StringWithAggregatesFilter<"TournamentMatch"> | string
    winnerName?: StringNullableWithAggregatesFilter<"TournamentMatch"> | string | null
    isBye?: BoolWithAggregatesFilter<"TournamentMatch"> | boolean
  }

  export type TournamentPlayerWhereInput = {
    AND?: TournamentPlayerWhereInput | TournamentPlayerWhereInput[]
    OR?: TournamentPlayerWhereInput[]
    NOT?: TournamentPlayerWhereInput | TournamentPlayerWhereInput[]
    id?: IntFilter<"TournamentPlayer"> | number
    tournamentId?: IntFilter<"TournamentPlayer"> | number
    playerName?: StringFilter<"TournamentPlayer"> | string
    isUser?: BoolFilter<"TournamentPlayer"> | boolean
    seed?: IntNullableFilter<"TournamentPlayer"> | number | null
    tournament?: XOR<TournamentScalarRelationFilter, TournamentWhereInput>
  }

  export type TournamentPlayerOrderByWithRelationInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    playerName?: SortOrder
    isUser?: SortOrder
    seed?: SortOrderInput | SortOrder
    tournament?: TournamentOrderByWithRelationInput
  }

  export type TournamentPlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TournamentPlayerWhereInput | TournamentPlayerWhereInput[]
    OR?: TournamentPlayerWhereInput[]
    NOT?: TournamentPlayerWhereInput | TournamentPlayerWhereInput[]
    tournamentId?: IntFilter<"TournamentPlayer"> | number
    playerName?: StringFilter<"TournamentPlayer"> | string
    isUser?: BoolFilter<"TournamentPlayer"> | boolean
    seed?: IntNullableFilter<"TournamentPlayer"> | number | null
    tournament?: XOR<TournamentScalarRelationFilter, TournamentWhereInput>
  }, "id">

  export type TournamentPlayerOrderByWithAggregationInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    playerName?: SortOrder
    isUser?: SortOrder
    seed?: SortOrderInput | SortOrder
    _count?: TournamentPlayerCountOrderByAggregateInput
    _avg?: TournamentPlayerAvgOrderByAggregateInput
    _max?: TournamentPlayerMaxOrderByAggregateInput
    _min?: TournamentPlayerMinOrderByAggregateInput
    _sum?: TournamentPlayerSumOrderByAggregateInput
  }

  export type TournamentPlayerScalarWhereWithAggregatesInput = {
    AND?: TournamentPlayerScalarWhereWithAggregatesInput | TournamentPlayerScalarWhereWithAggregatesInput[]
    OR?: TournamentPlayerScalarWhereWithAggregatesInput[]
    NOT?: TournamentPlayerScalarWhereWithAggregatesInput | TournamentPlayerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TournamentPlayer"> | number
    tournamentId?: IntWithAggregatesFilter<"TournamentPlayer"> | number
    playerName?: StringWithAggregatesFilter<"TournamentPlayer"> | string
    isUser?: BoolWithAggregatesFilter<"TournamentPlayer"> | boolean
    seed?: IntNullableWithAggregatesFilter<"TournamentPlayer"> | number | null
  }

  export type UserCreateInput = {
    google_id?: string | null
    username: string
    email: string
    password?: string | null
    avatar_url?: string | null
    display_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    totp_secret?: string | null
    friendsSent?: FriendCreateNestedManyWithoutSenderInput
    friendsReceived?: FriendCreateNestedManyWithoutReceiverInput
    matchesAsPlayer1?: MatchCreateNestedManyWithoutPlayer1Input
    matchesWon?: MatchCreateNestedManyWithoutWinnerInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    createdTournaments?: TournamentCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    google_id?: string | null
    username: string
    email: string
    password?: string | null
    avatar_url?: string | null
    display_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    totp_secret?: string | null
    friendsSent?: FriendUncheckedCreateNestedManyWithoutSenderInput
    friendsReceived?: FriendUncheckedCreateNestedManyWithoutReceiverInput
    matchesAsPlayer1?: MatchUncheckedCreateNestedManyWithoutPlayer1Input
    matchesWon?: MatchUncheckedCreateNestedManyWithoutWinnerInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    createdTournaments?: TournamentUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserUpdateInput = {
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    friendsSent?: FriendUpdateManyWithoutSenderNestedInput
    friendsReceived?: FriendUpdateManyWithoutReceiverNestedInput
    matchesAsPlayer1?: MatchUpdateManyWithoutPlayer1NestedInput
    matchesWon?: MatchUpdateManyWithoutWinnerNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    createdTournaments?: TournamentUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    friendsSent?: FriendUncheckedUpdateManyWithoutSenderNestedInput
    friendsReceived?: FriendUncheckedUpdateManyWithoutReceiverNestedInput
    matchesAsPlayer1?: MatchUncheckedUpdateManyWithoutPlayer1NestedInput
    matchesWon?: MatchUncheckedUpdateManyWithoutWinnerNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    createdTournaments?: TournamentUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    google_id?: string | null
    username: string
    email: string
    password?: string | null
    avatar_url?: string | null
    display_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    totp_secret?: string | null
  }

  export type UserUpdateManyMutationInput = {
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FriendCreateInput = {
    status?: $Enums.FriendStatus
    onlineStatus?: $Enums.OnlineStatus
    created_at?: Date | string
    updated_at?: Date | string
    sender: UserCreateNestedOneWithoutFriendsSentInput
    receiver: UserCreateNestedOneWithoutFriendsReceivedInput
  }

  export type FriendUncheckedCreateInput = {
    id?: number
    senderId: number
    receiverId: number
    status?: $Enums.FriendStatus
    onlineStatus?: $Enums.OnlineStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FriendUpdateInput = {
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    onlineStatus?: EnumOnlineStatusFieldUpdateOperationsInput | $Enums.OnlineStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutFriendsSentNestedInput
    receiver?: UserUpdateOneRequiredWithoutFriendsReceivedNestedInput
  }

  export type FriendUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    receiverId?: IntFieldUpdateOperationsInput | number
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    onlineStatus?: EnumOnlineStatusFieldUpdateOperationsInput | $Enums.OnlineStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendCreateManyInput = {
    id?: number
    senderId: number
    receiverId: number
    status?: $Enums.FriendStatus
    onlineStatus?: $Enums.OnlineStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FriendUpdateManyMutationInput = {
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    onlineStatus?: EnumOnlineStatusFieldUpdateOperationsInput | $Enums.OnlineStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    receiverId?: IntFieldUpdateOperationsInput | number
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    onlineStatus?: EnumOnlineStatusFieldUpdateOperationsInput | $Enums.OnlineStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchCreateInput = {
    player2Name: string
    winnerName: string
    score_p1: number
    score_p2: number
    gameType?: string
    played_at?: Date | string
    player1: UserCreateNestedOneWithoutMatchesAsPlayer1Input
    winner?: UserCreateNestedOneWithoutMatchesWonInput
    tournamentMatch?: TournamentMatchCreateNestedOneWithoutMatchInput
  }

  export type MatchUncheckedCreateInput = {
    id?: number
    player1Id: number
    player2Name: string
    winnerId?: number | null
    winnerName: string
    score_p1: number
    score_p2: number
    gameType?: string
    played_at?: Date | string
    tournamentMatch?: TournamentMatchUncheckedCreateNestedOneWithoutMatchInput
  }

  export type MatchUpdateInput = {
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerName?: StringFieldUpdateOperationsInput | string
    score_p1?: IntFieldUpdateOperationsInput | number
    score_p2?: IntFieldUpdateOperationsInput | number
    gameType?: StringFieldUpdateOperationsInput | string
    played_at?: DateTimeFieldUpdateOperationsInput | Date | string
    player1?: UserUpdateOneRequiredWithoutMatchesAsPlayer1NestedInput
    winner?: UserUpdateOneWithoutMatchesWonNestedInput
    tournamentMatch?: TournamentMatchUpdateOneWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    player1Id?: IntFieldUpdateOperationsInput | number
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    winnerName?: StringFieldUpdateOperationsInput | string
    score_p1?: IntFieldUpdateOperationsInput | number
    score_p2?: IntFieldUpdateOperationsInput | number
    gameType?: StringFieldUpdateOperationsInput | string
    played_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tournamentMatch?: TournamentMatchUncheckedUpdateOneWithoutMatchNestedInput
  }

  export type MatchCreateManyInput = {
    id?: number
    player1Id: number
    player2Name: string
    winnerId?: number | null
    winnerName: string
    score_p1: number
    score_p2: number
    gameType?: string
    played_at?: Date | string
  }

  export type MatchUpdateManyMutationInput = {
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerName?: StringFieldUpdateOperationsInput | string
    score_p1?: IntFieldUpdateOperationsInput | number
    score_p2?: IntFieldUpdateOperationsInput | number
    gameType?: StringFieldUpdateOperationsInput | string
    played_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    player1Id?: IntFieldUpdateOperationsInput | number
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    winnerName?: StringFieldUpdateOperationsInput | string
    score_p1?: IntFieldUpdateOperationsInput | number
    score_p2?: IntFieldUpdateOperationsInput | number
    gameType?: StringFieldUpdateOperationsInput | string
    played_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: $Enums.MessageStatus
    sender: UserCreateNestedOneWithoutSentMessagesInput
    receiver: UserCreateNestedOneWithoutReceivedMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: number
    senderId: number
    receiverId: number
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: $Enums.MessageStatus
  }

  export type MessageUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    receiverId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
  }

  export type MessageCreateManyInput = {
    id?: number
    senderId: number
    receiverId: number
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: $Enums.MessageStatus
  }

  export type MessageUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    receiverId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
  }

  export type TournamentCreateInput = {
    name: string
    status?: $Enums.TournamentStatus
    winnerName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedTournamentsInput
    players?: TournamentPlayerCreateNestedManyWithoutTournamentInput
    matches?: TournamentMatchCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateInput = {
    id?: number
    name: string
    status?: $Enums.TournamentStatus
    createdById: number
    winnerName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    players?: TournamentPlayerUncheckedCreateNestedManyWithoutTournamentInput
    matches?: TournamentMatchUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumTournamentStatusFieldUpdateOperationsInput | $Enums.TournamentStatus
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedTournamentsNestedInput
    players?: TournamentPlayerUpdateManyWithoutTournamentNestedInput
    matches?: TournamentMatchUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumTournamentStatusFieldUpdateOperationsInput | $Enums.TournamentStatus
    createdById?: IntFieldUpdateOperationsInput | number
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: TournamentPlayerUncheckedUpdateManyWithoutTournamentNestedInput
    matches?: TournamentMatchUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentCreateManyInput = {
    id?: number
    name: string
    status?: $Enums.TournamentStatus
    createdById: number
    winnerName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TournamentUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumTournamentStatusFieldUpdateOperationsInput | $Enums.TournamentStatus
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumTournamentStatusFieldUpdateOperationsInput | $Enums.TournamentStatus
    createdById?: IntFieldUpdateOperationsInput | number
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentMatchCreateInput = {
    roundNumber: number
    matchNumber: number
    player1Name: string
    player2Name: string
    winnerName?: string | null
    isBye?: boolean
    tournament: TournamentCreateNestedOneWithoutMatchesInput
    match: MatchCreateNestedOneWithoutTournamentMatchInput
  }

  export type TournamentMatchUncheckedCreateInput = {
    id?: number
    tournamentId: number
    matchId: number
    roundNumber: number
    matchNumber: number
    player1Name: string
    player2Name: string
    winnerName?: string | null
    isBye?: boolean
  }

  export type TournamentMatchUpdateInput = {
    roundNumber?: IntFieldUpdateOperationsInput | number
    matchNumber?: IntFieldUpdateOperationsInput | number
    player1Name?: StringFieldUpdateOperationsInput | string
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    isBye?: BoolFieldUpdateOperationsInput | boolean
    tournament?: TournamentUpdateOneRequiredWithoutMatchesNestedInput
    match?: MatchUpdateOneRequiredWithoutTournamentMatchNestedInput
  }

  export type TournamentMatchUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentId?: IntFieldUpdateOperationsInput | number
    matchId?: IntFieldUpdateOperationsInput | number
    roundNumber?: IntFieldUpdateOperationsInput | number
    matchNumber?: IntFieldUpdateOperationsInput | number
    player1Name?: StringFieldUpdateOperationsInput | string
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    isBye?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TournamentMatchCreateManyInput = {
    id?: number
    tournamentId: number
    matchId: number
    roundNumber: number
    matchNumber: number
    player1Name: string
    player2Name: string
    winnerName?: string | null
    isBye?: boolean
  }

  export type TournamentMatchUpdateManyMutationInput = {
    roundNumber?: IntFieldUpdateOperationsInput | number
    matchNumber?: IntFieldUpdateOperationsInput | number
    player1Name?: StringFieldUpdateOperationsInput | string
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    isBye?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TournamentMatchUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentId?: IntFieldUpdateOperationsInput | number
    matchId?: IntFieldUpdateOperationsInput | number
    roundNumber?: IntFieldUpdateOperationsInput | number
    matchNumber?: IntFieldUpdateOperationsInput | number
    player1Name?: StringFieldUpdateOperationsInput | string
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    isBye?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TournamentPlayerCreateInput = {
    playerName: string
    isUser?: boolean
    seed?: number | null
    tournament: TournamentCreateNestedOneWithoutPlayersInput
  }

  export type TournamentPlayerUncheckedCreateInput = {
    id?: number
    tournamentId: number
    playerName: string
    isUser?: boolean
    seed?: number | null
  }

  export type TournamentPlayerUpdateInput = {
    playerName?: StringFieldUpdateOperationsInput | string
    isUser?: BoolFieldUpdateOperationsInput | boolean
    seed?: NullableIntFieldUpdateOperationsInput | number | null
    tournament?: TournamentUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type TournamentPlayerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentId?: IntFieldUpdateOperationsInput | number
    playerName?: StringFieldUpdateOperationsInput | string
    isUser?: BoolFieldUpdateOperationsInput | boolean
    seed?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TournamentPlayerCreateManyInput = {
    id?: number
    tournamentId: number
    playerName: string
    isUser?: boolean
    seed?: number | null
  }

  export type TournamentPlayerUpdateManyMutationInput = {
    playerName?: StringFieldUpdateOperationsInput | string
    isUser?: BoolFieldUpdateOperationsInput | boolean
    seed?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TournamentPlayerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentId?: IntFieldUpdateOperationsInput | number
    playerName?: StringFieldUpdateOperationsInput | string
    isUser?: BoolFieldUpdateOperationsInput | boolean
    seed?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FriendListRelationFilter = {
    every?: FriendWhereInput
    some?: FriendWhereInput
    none?: FriendWhereInput
  }

  export type MatchListRelationFilter = {
    every?: MatchWhereInput
    some?: MatchWhereInput
    none?: MatchWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type TournamentListRelationFilter = {
    every?: TournamentWhereInput
    some?: TournamentWhereInput
    none?: TournamentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FriendOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MatchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TournamentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    google_id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar_url?: SortOrder
    display_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    totp_secret?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    google_id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar_url?: SortOrder
    display_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    totp_secret?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    google_id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar_url?: SortOrder
    display_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    totp_secret?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumFriendStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendStatus | EnumFriendStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendStatus[]
    notIn?: $Enums.FriendStatus[]
    not?: NestedEnumFriendStatusFilter<$PrismaModel> | $Enums.FriendStatus
  }

  export type EnumOnlineStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OnlineStatus | EnumOnlineStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OnlineStatus[]
    notIn?: $Enums.OnlineStatus[]
    not?: NestedEnumOnlineStatusFilter<$PrismaModel> | $Enums.OnlineStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type FriendSenderIdReceiverIdCompoundUniqueInput = {
    senderId: number
    receiverId: number
  }

  export type FriendCountOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    onlineStatus?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FriendAvgOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
  }

  export type FriendMaxOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    onlineStatus?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FriendMinOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    onlineStatus?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FriendSumOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
  }

  export type EnumFriendStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendStatus | EnumFriendStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendStatus[]
    notIn?: $Enums.FriendStatus[]
    not?: NestedEnumFriendStatusWithAggregatesFilter<$PrismaModel> | $Enums.FriendStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFriendStatusFilter<$PrismaModel>
    _max?: NestedEnumFriendStatusFilter<$PrismaModel>
  }

  export type EnumOnlineStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OnlineStatus | EnumOnlineStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OnlineStatus[]
    notIn?: $Enums.OnlineStatus[]
    not?: NestedEnumOnlineStatusWithAggregatesFilter<$PrismaModel> | $Enums.OnlineStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOnlineStatusFilter<$PrismaModel>
    _max?: NestedEnumOnlineStatusFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TournamentMatchNullableScalarRelationFilter = {
    is?: TournamentMatchWhereInput | null
    isNot?: TournamentMatchWhereInput | null
  }

  export type MatchCountOrderByAggregateInput = {
    id?: SortOrder
    player1Id?: SortOrder
    player2Name?: SortOrder
    winnerId?: SortOrder
    winnerName?: SortOrder
    score_p1?: SortOrder
    score_p2?: SortOrder
    gameType?: SortOrder
    played_at?: SortOrder
  }

  export type MatchAvgOrderByAggregateInput = {
    id?: SortOrder
    player1Id?: SortOrder
    winnerId?: SortOrder
    score_p1?: SortOrder
    score_p2?: SortOrder
  }

  export type MatchMaxOrderByAggregateInput = {
    id?: SortOrder
    player1Id?: SortOrder
    player2Name?: SortOrder
    winnerId?: SortOrder
    winnerName?: SortOrder
    score_p1?: SortOrder
    score_p2?: SortOrder
    gameType?: SortOrder
    played_at?: SortOrder
  }

  export type MatchMinOrderByAggregateInput = {
    id?: SortOrder
    player1Id?: SortOrder
    player2Name?: SortOrder
    winnerId?: SortOrder
    winnerName?: SortOrder
    score_p1?: SortOrder
    score_p2?: SortOrder
    gameType?: SortOrder
    played_at?: SortOrder
  }

  export type MatchSumOrderByAggregateInput = {
    id?: SortOrder
    player1Id?: SortOrder
    winnerId?: SortOrder
    score_p1?: SortOrder
    score_p2?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumMessageStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageStatus | EnumMessageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MessageStatus[]
    notIn?: $Enums.MessageStatus[]
    not?: NestedEnumMessageStatusFilter<$PrismaModel> | $Enums.MessageStatus
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    status?: SortOrder
  }

  export type MessageAvgOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    status?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    status?: SortOrder
  }

  export type MessageSumOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
  }

  export type EnumMessageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageStatus | EnumMessageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MessageStatus[]
    notIn?: $Enums.MessageStatus[]
    not?: NestedEnumMessageStatusWithAggregatesFilter<$PrismaModel> | $Enums.MessageStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageStatusFilter<$PrismaModel>
    _max?: NestedEnumMessageStatusFilter<$PrismaModel>
  }

  export type EnumTournamentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TournamentStatus | EnumTournamentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TournamentStatus[]
    notIn?: $Enums.TournamentStatus[]
    not?: NestedEnumTournamentStatusFilter<$PrismaModel> | $Enums.TournamentStatus
  }

  export type TournamentPlayerListRelationFilter = {
    every?: TournamentPlayerWhereInput
    some?: TournamentPlayerWhereInput
    none?: TournamentPlayerWhereInput
  }

  export type TournamentMatchListRelationFilter = {
    every?: TournamentMatchWhereInput
    some?: TournamentMatchWhereInput
    none?: TournamentMatchWhereInput
  }

  export type TournamentPlayerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TournamentMatchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TournamentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    createdById?: SortOrder
    winnerName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TournamentAvgOrderByAggregateInput = {
    id?: SortOrder
    createdById?: SortOrder
  }

  export type TournamentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    createdById?: SortOrder
    winnerName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TournamentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    createdById?: SortOrder
    winnerName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TournamentSumOrderByAggregateInput = {
    id?: SortOrder
    createdById?: SortOrder
  }

  export type EnumTournamentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TournamentStatus | EnumTournamentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TournamentStatus[]
    notIn?: $Enums.TournamentStatus[]
    not?: NestedEnumTournamentStatusWithAggregatesFilter<$PrismaModel> | $Enums.TournamentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTournamentStatusFilter<$PrismaModel>
    _max?: NestedEnumTournamentStatusFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TournamentScalarRelationFilter = {
    is?: TournamentWhereInput
    isNot?: TournamentWhereInput
  }

  export type MatchScalarRelationFilter = {
    is?: MatchWhereInput
    isNot?: MatchWhereInput
  }

  export type TournamentMatchCountOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    matchId?: SortOrder
    roundNumber?: SortOrder
    matchNumber?: SortOrder
    player1Name?: SortOrder
    player2Name?: SortOrder
    winnerName?: SortOrder
    isBye?: SortOrder
  }

  export type TournamentMatchAvgOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    matchId?: SortOrder
    roundNumber?: SortOrder
    matchNumber?: SortOrder
  }

  export type TournamentMatchMaxOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    matchId?: SortOrder
    roundNumber?: SortOrder
    matchNumber?: SortOrder
    player1Name?: SortOrder
    player2Name?: SortOrder
    winnerName?: SortOrder
    isBye?: SortOrder
  }

  export type TournamentMatchMinOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    matchId?: SortOrder
    roundNumber?: SortOrder
    matchNumber?: SortOrder
    player1Name?: SortOrder
    player2Name?: SortOrder
    winnerName?: SortOrder
    isBye?: SortOrder
  }

  export type TournamentMatchSumOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    matchId?: SortOrder
    roundNumber?: SortOrder
    matchNumber?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TournamentPlayerCountOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    playerName?: SortOrder
    isUser?: SortOrder
    seed?: SortOrder
  }

  export type TournamentPlayerAvgOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    seed?: SortOrder
  }

  export type TournamentPlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    playerName?: SortOrder
    isUser?: SortOrder
    seed?: SortOrder
  }

  export type TournamentPlayerMinOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    playerName?: SortOrder
    isUser?: SortOrder
    seed?: SortOrder
  }

  export type TournamentPlayerSumOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    seed?: SortOrder
  }

  export type FriendCreateNestedManyWithoutSenderInput = {
    create?: XOR<FriendCreateWithoutSenderInput, FriendUncheckedCreateWithoutSenderInput> | FriendCreateWithoutSenderInput[] | FriendUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutSenderInput | FriendCreateOrConnectWithoutSenderInput[]
    createMany?: FriendCreateManySenderInputEnvelope
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
  }

  export type FriendCreateNestedManyWithoutReceiverInput = {
    create?: XOR<FriendCreateWithoutReceiverInput, FriendUncheckedCreateWithoutReceiverInput> | FriendCreateWithoutReceiverInput[] | FriendUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutReceiverInput | FriendCreateOrConnectWithoutReceiverInput[]
    createMany?: FriendCreateManyReceiverInputEnvelope
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
  }

  export type MatchCreateNestedManyWithoutPlayer1Input = {
    create?: XOR<MatchCreateWithoutPlayer1Input, MatchUncheckedCreateWithoutPlayer1Input> | MatchCreateWithoutPlayer1Input[] | MatchUncheckedCreateWithoutPlayer1Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutPlayer1Input | MatchCreateOrConnectWithoutPlayer1Input[]
    createMany?: MatchCreateManyPlayer1InputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type MatchCreateNestedManyWithoutWinnerInput = {
    create?: XOR<MatchCreateWithoutWinnerInput, MatchUncheckedCreateWithoutWinnerInput> | MatchCreateWithoutWinnerInput[] | MatchUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutWinnerInput | MatchCreateOrConnectWithoutWinnerInput[]
    createMany?: MatchCreateManyWinnerInputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutReceiverInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type TournamentCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TournamentCreateWithoutCreatedByInput, TournamentUncheckedCreateWithoutCreatedByInput> | TournamentCreateWithoutCreatedByInput[] | TournamentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutCreatedByInput | TournamentCreateOrConnectWithoutCreatedByInput[]
    createMany?: TournamentCreateManyCreatedByInputEnvelope
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
  }

  export type FriendUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<FriendCreateWithoutSenderInput, FriendUncheckedCreateWithoutSenderInput> | FriendCreateWithoutSenderInput[] | FriendUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutSenderInput | FriendCreateOrConnectWithoutSenderInput[]
    createMany?: FriendCreateManySenderInputEnvelope
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
  }

  export type FriendUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<FriendCreateWithoutReceiverInput, FriendUncheckedCreateWithoutReceiverInput> | FriendCreateWithoutReceiverInput[] | FriendUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutReceiverInput | FriendCreateOrConnectWithoutReceiverInput[]
    createMany?: FriendCreateManyReceiverInputEnvelope
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
  }

  export type MatchUncheckedCreateNestedManyWithoutPlayer1Input = {
    create?: XOR<MatchCreateWithoutPlayer1Input, MatchUncheckedCreateWithoutPlayer1Input> | MatchCreateWithoutPlayer1Input[] | MatchUncheckedCreateWithoutPlayer1Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutPlayer1Input | MatchCreateOrConnectWithoutPlayer1Input[]
    createMany?: MatchCreateManyPlayer1InputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type MatchUncheckedCreateNestedManyWithoutWinnerInput = {
    create?: XOR<MatchCreateWithoutWinnerInput, MatchUncheckedCreateWithoutWinnerInput> | MatchCreateWithoutWinnerInput[] | MatchUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutWinnerInput | MatchCreateOrConnectWithoutWinnerInput[]
    createMany?: MatchCreateManyWinnerInputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type TournamentUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TournamentCreateWithoutCreatedByInput, TournamentUncheckedCreateWithoutCreatedByInput> | TournamentCreateWithoutCreatedByInput[] | TournamentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutCreatedByInput | TournamentCreateOrConnectWithoutCreatedByInput[]
    createMany?: TournamentCreateManyCreatedByInputEnvelope
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FriendUpdateManyWithoutSenderNestedInput = {
    create?: XOR<FriendCreateWithoutSenderInput, FriendUncheckedCreateWithoutSenderInput> | FriendCreateWithoutSenderInput[] | FriendUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutSenderInput | FriendCreateOrConnectWithoutSenderInput[]
    upsert?: FriendUpsertWithWhereUniqueWithoutSenderInput | FriendUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: FriendCreateManySenderInputEnvelope
    set?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    disconnect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    delete?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    update?: FriendUpdateWithWhereUniqueWithoutSenderInput | FriendUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: FriendUpdateManyWithWhereWithoutSenderInput | FriendUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: FriendScalarWhereInput | FriendScalarWhereInput[]
  }

  export type FriendUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<FriendCreateWithoutReceiverInput, FriendUncheckedCreateWithoutReceiverInput> | FriendCreateWithoutReceiverInput[] | FriendUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutReceiverInput | FriendCreateOrConnectWithoutReceiverInput[]
    upsert?: FriendUpsertWithWhereUniqueWithoutReceiverInput | FriendUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: FriendCreateManyReceiverInputEnvelope
    set?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    disconnect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    delete?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    update?: FriendUpdateWithWhereUniqueWithoutReceiverInput | FriendUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: FriendUpdateManyWithWhereWithoutReceiverInput | FriendUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: FriendScalarWhereInput | FriendScalarWhereInput[]
  }

  export type MatchUpdateManyWithoutPlayer1NestedInput = {
    create?: XOR<MatchCreateWithoutPlayer1Input, MatchUncheckedCreateWithoutPlayer1Input> | MatchCreateWithoutPlayer1Input[] | MatchUncheckedCreateWithoutPlayer1Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutPlayer1Input | MatchCreateOrConnectWithoutPlayer1Input[]
    upsert?: MatchUpsertWithWhereUniqueWithoutPlayer1Input | MatchUpsertWithWhereUniqueWithoutPlayer1Input[]
    createMany?: MatchCreateManyPlayer1InputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutPlayer1Input | MatchUpdateWithWhereUniqueWithoutPlayer1Input[]
    updateMany?: MatchUpdateManyWithWhereWithoutPlayer1Input | MatchUpdateManyWithWhereWithoutPlayer1Input[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type MatchUpdateManyWithoutWinnerNestedInput = {
    create?: XOR<MatchCreateWithoutWinnerInput, MatchUncheckedCreateWithoutWinnerInput> | MatchCreateWithoutWinnerInput[] | MatchUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutWinnerInput | MatchCreateOrConnectWithoutWinnerInput[]
    upsert?: MatchUpsertWithWhereUniqueWithoutWinnerInput | MatchUpsertWithWhereUniqueWithoutWinnerInput[]
    createMany?: MatchCreateManyWinnerInputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutWinnerInput | MatchUpdateWithWhereUniqueWithoutWinnerInput[]
    updateMany?: MatchUpdateManyWithWhereWithoutWinnerInput | MatchUpdateManyWithWhereWithoutWinnerInput[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReceiverInput | MessageUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReceiverInput | MessageUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReceiverInput | MessageUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type TournamentUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TournamentCreateWithoutCreatedByInput, TournamentUncheckedCreateWithoutCreatedByInput> | TournamentCreateWithoutCreatedByInput[] | TournamentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutCreatedByInput | TournamentCreateOrConnectWithoutCreatedByInput[]
    upsert?: TournamentUpsertWithWhereUniqueWithoutCreatedByInput | TournamentUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TournamentCreateManyCreatedByInputEnvelope
    set?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    disconnect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    delete?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    update?: TournamentUpdateWithWhereUniqueWithoutCreatedByInput | TournamentUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TournamentUpdateManyWithWhereWithoutCreatedByInput | TournamentUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FriendUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<FriendCreateWithoutSenderInput, FriendUncheckedCreateWithoutSenderInput> | FriendCreateWithoutSenderInput[] | FriendUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutSenderInput | FriendCreateOrConnectWithoutSenderInput[]
    upsert?: FriendUpsertWithWhereUniqueWithoutSenderInput | FriendUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: FriendCreateManySenderInputEnvelope
    set?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    disconnect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    delete?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    update?: FriendUpdateWithWhereUniqueWithoutSenderInput | FriendUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: FriendUpdateManyWithWhereWithoutSenderInput | FriendUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: FriendScalarWhereInput | FriendScalarWhereInput[]
  }

  export type FriendUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<FriendCreateWithoutReceiverInput, FriendUncheckedCreateWithoutReceiverInput> | FriendCreateWithoutReceiverInput[] | FriendUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutReceiverInput | FriendCreateOrConnectWithoutReceiverInput[]
    upsert?: FriendUpsertWithWhereUniqueWithoutReceiverInput | FriendUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: FriendCreateManyReceiverInputEnvelope
    set?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    disconnect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    delete?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    update?: FriendUpdateWithWhereUniqueWithoutReceiverInput | FriendUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: FriendUpdateManyWithWhereWithoutReceiverInput | FriendUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: FriendScalarWhereInput | FriendScalarWhereInput[]
  }

  export type MatchUncheckedUpdateManyWithoutPlayer1NestedInput = {
    create?: XOR<MatchCreateWithoutPlayer1Input, MatchUncheckedCreateWithoutPlayer1Input> | MatchCreateWithoutPlayer1Input[] | MatchUncheckedCreateWithoutPlayer1Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutPlayer1Input | MatchCreateOrConnectWithoutPlayer1Input[]
    upsert?: MatchUpsertWithWhereUniqueWithoutPlayer1Input | MatchUpsertWithWhereUniqueWithoutPlayer1Input[]
    createMany?: MatchCreateManyPlayer1InputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutPlayer1Input | MatchUpdateWithWhereUniqueWithoutPlayer1Input[]
    updateMany?: MatchUpdateManyWithWhereWithoutPlayer1Input | MatchUpdateManyWithWhereWithoutPlayer1Input[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type MatchUncheckedUpdateManyWithoutWinnerNestedInput = {
    create?: XOR<MatchCreateWithoutWinnerInput, MatchUncheckedCreateWithoutWinnerInput> | MatchCreateWithoutWinnerInput[] | MatchUncheckedCreateWithoutWinnerInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutWinnerInput | MatchCreateOrConnectWithoutWinnerInput[]
    upsert?: MatchUpsertWithWhereUniqueWithoutWinnerInput | MatchUpsertWithWhereUniqueWithoutWinnerInput[]
    createMany?: MatchCreateManyWinnerInputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutWinnerInput | MatchUpdateWithWhereUniqueWithoutWinnerInput[]
    updateMany?: MatchUpdateManyWithWhereWithoutWinnerInput | MatchUpdateManyWithWhereWithoutWinnerInput[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReceiverInput | MessageUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReceiverInput | MessageUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReceiverInput | MessageUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type TournamentUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TournamentCreateWithoutCreatedByInput, TournamentUncheckedCreateWithoutCreatedByInput> | TournamentCreateWithoutCreatedByInput[] | TournamentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutCreatedByInput | TournamentCreateOrConnectWithoutCreatedByInput[]
    upsert?: TournamentUpsertWithWhereUniqueWithoutCreatedByInput | TournamentUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TournamentCreateManyCreatedByInputEnvelope
    set?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    disconnect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    delete?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    update?: TournamentUpdateWithWhereUniqueWithoutCreatedByInput | TournamentUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TournamentUpdateManyWithWhereWithoutCreatedByInput | TournamentUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutFriendsSentInput = {
    create?: XOR<UserCreateWithoutFriendsSentInput, UserUncheckedCreateWithoutFriendsSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendsSentInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFriendsReceivedInput = {
    create?: XOR<UserCreateWithoutFriendsReceivedInput, UserUncheckedCreateWithoutFriendsReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendsReceivedInput
    connect?: UserWhereUniqueInput
  }

  export type EnumFriendStatusFieldUpdateOperationsInput = {
    set?: $Enums.FriendStatus
  }

  export type EnumOnlineStatusFieldUpdateOperationsInput = {
    set?: $Enums.OnlineStatus
  }

  export type UserUpdateOneRequiredWithoutFriendsSentNestedInput = {
    create?: XOR<UserCreateWithoutFriendsSentInput, UserUncheckedCreateWithoutFriendsSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendsSentInput
    upsert?: UserUpsertWithoutFriendsSentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriendsSentInput, UserUpdateWithoutFriendsSentInput>, UserUncheckedUpdateWithoutFriendsSentInput>
  }

  export type UserUpdateOneRequiredWithoutFriendsReceivedNestedInput = {
    create?: XOR<UserCreateWithoutFriendsReceivedInput, UserUncheckedCreateWithoutFriendsReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendsReceivedInput
    upsert?: UserUpsertWithoutFriendsReceivedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriendsReceivedInput, UserUpdateWithoutFriendsReceivedInput>, UserUncheckedUpdateWithoutFriendsReceivedInput>
  }

  export type UserCreateNestedOneWithoutMatchesAsPlayer1Input = {
    create?: XOR<UserCreateWithoutMatchesAsPlayer1Input, UserUncheckedCreateWithoutMatchesAsPlayer1Input>
    connectOrCreate?: UserCreateOrConnectWithoutMatchesAsPlayer1Input
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMatchesWonInput = {
    create?: XOR<UserCreateWithoutMatchesWonInput, UserUncheckedCreateWithoutMatchesWonInput>
    connectOrCreate?: UserCreateOrConnectWithoutMatchesWonInput
    connect?: UserWhereUniqueInput
  }

  export type TournamentMatchCreateNestedOneWithoutMatchInput = {
    create?: XOR<TournamentMatchCreateWithoutMatchInput, TournamentMatchUncheckedCreateWithoutMatchInput>
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutMatchInput
    connect?: TournamentMatchWhereUniqueInput
  }

  export type TournamentMatchUncheckedCreateNestedOneWithoutMatchInput = {
    create?: XOR<TournamentMatchCreateWithoutMatchInput, TournamentMatchUncheckedCreateWithoutMatchInput>
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutMatchInput
    connect?: TournamentMatchWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutMatchesAsPlayer1NestedInput = {
    create?: XOR<UserCreateWithoutMatchesAsPlayer1Input, UserUncheckedCreateWithoutMatchesAsPlayer1Input>
    connectOrCreate?: UserCreateOrConnectWithoutMatchesAsPlayer1Input
    upsert?: UserUpsertWithoutMatchesAsPlayer1Input
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMatchesAsPlayer1Input, UserUpdateWithoutMatchesAsPlayer1Input>, UserUncheckedUpdateWithoutMatchesAsPlayer1Input>
  }

  export type UserUpdateOneWithoutMatchesWonNestedInput = {
    create?: XOR<UserCreateWithoutMatchesWonInput, UserUncheckedCreateWithoutMatchesWonInput>
    connectOrCreate?: UserCreateOrConnectWithoutMatchesWonInput
    upsert?: UserUpsertWithoutMatchesWonInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMatchesWonInput, UserUpdateWithoutMatchesWonInput>, UserUncheckedUpdateWithoutMatchesWonInput>
  }

  export type TournamentMatchUpdateOneWithoutMatchNestedInput = {
    create?: XOR<TournamentMatchCreateWithoutMatchInput, TournamentMatchUncheckedCreateWithoutMatchInput>
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutMatchInput
    upsert?: TournamentMatchUpsertWithoutMatchInput
    disconnect?: TournamentMatchWhereInput | boolean
    delete?: TournamentMatchWhereInput | boolean
    connect?: TournamentMatchWhereUniqueInput
    update?: XOR<XOR<TournamentMatchUpdateToOneWithWhereWithoutMatchInput, TournamentMatchUpdateWithoutMatchInput>, TournamentMatchUncheckedUpdateWithoutMatchInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TournamentMatchUncheckedUpdateOneWithoutMatchNestedInput = {
    create?: XOR<TournamentMatchCreateWithoutMatchInput, TournamentMatchUncheckedCreateWithoutMatchInput>
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutMatchInput
    upsert?: TournamentMatchUpsertWithoutMatchInput
    disconnect?: TournamentMatchWhereInput | boolean
    delete?: TournamentMatchWhereInput | boolean
    connect?: TournamentMatchWhereUniqueInput
    update?: XOR<XOR<TournamentMatchUpdateToOneWithWhereWithoutMatchInput, TournamentMatchUpdateWithoutMatchInput>, TournamentMatchUncheckedUpdateWithoutMatchInput>
  }

  export type UserCreateNestedOneWithoutSentMessagesInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedMessagesInput = {
    create?: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumMessageStatusFieldUpdateOperationsInput = {
    set?: $Enums.MessageStatus
  }

  export type UserUpdateOneRequiredWithoutSentMessagesNestedInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    upsert?: UserUpsertWithoutSentMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentMessagesInput, UserUpdateWithoutSentMessagesInput>, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedMessagesNestedInput = {
    create?: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedMessagesInput
    upsert?: UserUpsertWithoutReceivedMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedMessagesInput, UserUpdateWithoutReceivedMessagesInput>, UserUncheckedUpdateWithoutReceivedMessagesInput>
  }

  export type UserCreateNestedOneWithoutCreatedTournamentsInput = {
    create?: XOR<UserCreateWithoutCreatedTournamentsInput, UserUncheckedCreateWithoutCreatedTournamentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTournamentsInput
    connect?: UserWhereUniqueInput
  }

  export type TournamentPlayerCreateNestedManyWithoutTournamentInput = {
    create?: XOR<TournamentPlayerCreateWithoutTournamentInput, TournamentPlayerUncheckedCreateWithoutTournamentInput> | TournamentPlayerCreateWithoutTournamentInput[] | TournamentPlayerUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentPlayerCreateOrConnectWithoutTournamentInput | TournamentPlayerCreateOrConnectWithoutTournamentInput[]
    createMany?: TournamentPlayerCreateManyTournamentInputEnvelope
    connect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
  }

  export type TournamentMatchCreateNestedManyWithoutTournamentInput = {
    create?: XOR<TournamentMatchCreateWithoutTournamentInput, TournamentMatchUncheckedCreateWithoutTournamentInput> | TournamentMatchCreateWithoutTournamentInput[] | TournamentMatchUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutTournamentInput | TournamentMatchCreateOrConnectWithoutTournamentInput[]
    createMany?: TournamentMatchCreateManyTournamentInputEnvelope
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
  }

  export type TournamentPlayerUncheckedCreateNestedManyWithoutTournamentInput = {
    create?: XOR<TournamentPlayerCreateWithoutTournamentInput, TournamentPlayerUncheckedCreateWithoutTournamentInput> | TournamentPlayerCreateWithoutTournamentInput[] | TournamentPlayerUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentPlayerCreateOrConnectWithoutTournamentInput | TournamentPlayerCreateOrConnectWithoutTournamentInput[]
    createMany?: TournamentPlayerCreateManyTournamentInputEnvelope
    connect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
  }

  export type TournamentMatchUncheckedCreateNestedManyWithoutTournamentInput = {
    create?: XOR<TournamentMatchCreateWithoutTournamentInput, TournamentMatchUncheckedCreateWithoutTournamentInput> | TournamentMatchCreateWithoutTournamentInput[] | TournamentMatchUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutTournamentInput | TournamentMatchCreateOrConnectWithoutTournamentInput[]
    createMany?: TournamentMatchCreateManyTournamentInputEnvelope
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
  }

  export type EnumTournamentStatusFieldUpdateOperationsInput = {
    set?: $Enums.TournamentStatus
  }

  export type UserUpdateOneRequiredWithoutCreatedTournamentsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedTournamentsInput, UserUncheckedCreateWithoutCreatedTournamentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTournamentsInput
    upsert?: UserUpsertWithoutCreatedTournamentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedTournamentsInput, UserUpdateWithoutCreatedTournamentsInput>, UserUncheckedUpdateWithoutCreatedTournamentsInput>
  }

  export type TournamentPlayerUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<TournamentPlayerCreateWithoutTournamentInput, TournamentPlayerUncheckedCreateWithoutTournamentInput> | TournamentPlayerCreateWithoutTournamentInput[] | TournamentPlayerUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentPlayerCreateOrConnectWithoutTournamentInput | TournamentPlayerCreateOrConnectWithoutTournamentInput[]
    upsert?: TournamentPlayerUpsertWithWhereUniqueWithoutTournamentInput | TournamentPlayerUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: TournamentPlayerCreateManyTournamentInputEnvelope
    set?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    disconnect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    delete?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    connect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    update?: TournamentPlayerUpdateWithWhereUniqueWithoutTournamentInput | TournamentPlayerUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: TournamentPlayerUpdateManyWithWhereWithoutTournamentInput | TournamentPlayerUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: TournamentPlayerScalarWhereInput | TournamentPlayerScalarWhereInput[]
  }

  export type TournamentMatchUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<TournamentMatchCreateWithoutTournamentInput, TournamentMatchUncheckedCreateWithoutTournamentInput> | TournamentMatchCreateWithoutTournamentInput[] | TournamentMatchUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutTournamentInput | TournamentMatchCreateOrConnectWithoutTournamentInput[]
    upsert?: TournamentMatchUpsertWithWhereUniqueWithoutTournamentInput | TournamentMatchUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: TournamentMatchCreateManyTournamentInputEnvelope
    set?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    disconnect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    delete?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    update?: TournamentMatchUpdateWithWhereUniqueWithoutTournamentInput | TournamentMatchUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: TournamentMatchUpdateManyWithWhereWithoutTournamentInput | TournamentMatchUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: TournamentMatchScalarWhereInput | TournamentMatchScalarWhereInput[]
  }

  export type TournamentPlayerUncheckedUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<TournamentPlayerCreateWithoutTournamentInput, TournamentPlayerUncheckedCreateWithoutTournamentInput> | TournamentPlayerCreateWithoutTournamentInput[] | TournamentPlayerUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentPlayerCreateOrConnectWithoutTournamentInput | TournamentPlayerCreateOrConnectWithoutTournamentInput[]
    upsert?: TournamentPlayerUpsertWithWhereUniqueWithoutTournamentInput | TournamentPlayerUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: TournamentPlayerCreateManyTournamentInputEnvelope
    set?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    disconnect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    delete?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    connect?: TournamentPlayerWhereUniqueInput | TournamentPlayerWhereUniqueInput[]
    update?: TournamentPlayerUpdateWithWhereUniqueWithoutTournamentInput | TournamentPlayerUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: TournamentPlayerUpdateManyWithWhereWithoutTournamentInput | TournamentPlayerUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: TournamentPlayerScalarWhereInput | TournamentPlayerScalarWhereInput[]
  }

  export type TournamentMatchUncheckedUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<TournamentMatchCreateWithoutTournamentInput, TournamentMatchUncheckedCreateWithoutTournamentInput> | TournamentMatchCreateWithoutTournamentInput[] | TournamentMatchUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentMatchCreateOrConnectWithoutTournamentInput | TournamentMatchCreateOrConnectWithoutTournamentInput[]
    upsert?: TournamentMatchUpsertWithWhereUniqueWithoutTournamentInput | TournamentMatchUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: TournamentMatchCreateManyTournamentInputEnvelope
    set?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    disconnect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    delete?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    connect?: TournamentMatchWhereUniqueInput | TournamentMatchWhereUniqueInput[]
    update?: TournamentMatchUpdateWithWhereUniqueWithoutTournamentInput | TournamentMatchUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: TournamentMatchUpdateManyWithWhereWithoutTournamentInput | TournamentMatchUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: TournamentMatchScalarWhereInput | TournamentMatchScalarWhereInput[]
  }

  export type TournamentCreateNestedOneWithoutMatchesInput = {
    create?: XOR<TournamentCreateWithoutMatchesInput, TournamentUncheckedCreateWithoutMatchesInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutMatchesInput
    connect?: TournamentWhereUniqueInput
  }

  export type MatchCreateNestedOneWithoutTournamentMatchInput = {
    create?: XOR<MatchCreateWithoutTournamentMatchInput, MatchUncheckedCreateWithoutTournamentMatchInput>
    connectOrCreate?: MatchCreateOrConnectWithoutTournamentMatchInput
    connect?: MatchWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TournamentUpdateOneRequiredWithoutMatchesNestedInput = {
    create?: XOR<TournamentCreateWithoutMatchesInput, TournamentUncheckedCreateWithoutMatchesInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutMatchesInput
    upsert?: TournamentUpsertWithoutMatchesInput
    connect?: TournamentWhereUniqueInput
    update?: XOR<XOR<TournamentUpdateToOneWithWhereWithoutMatchesInput, TournamentUpdateWithoutMatchesInput>, TournamentUncheckedUpdateWithoutMatchesInput>
  }

  export type MatchUpdateOneRequiredWithoutTournamentMatchNestedInput = {
    create?: XOR<MatchCreateWithoutTournamentMatchInput, MatchUncheckedCreateWithoutTournamentMatchInput>
    connectOrCreate?: MatchCreateOrConnectWithoutTournamentMatchInput
    upsert?: MatchUpsertWithoutTournamentMatchInput
    connect?: MatchWhereUniqueInput
    update?: XOR<XOR<MatchUpdateToOneWithWhereWithoutTournamentMatchInput, MatchUpdateWithoutTournamentMatchInput>, MatchUncheckedUpdateWithoutTournamentMatchInput>
  }

  export type TournamentCreateNestedOneWithoutPlayersInput = {
    create?: XOR<TournamentCreateWithoutPlayersInput, TournamentUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutPlayersInput
    connect?: TournamentWhereUniqueInput
  }

  export type TournamentUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<TournamentCreateWithoutPlayersInput, TournamentUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutPlayersInput
    upsert?: TournamentUpsertWithoutPlayersInput
    connect?: TournamentWhereUniqueInput
    update?: XOR<XOR<TournamentUpdateToOneWithWhereWithoutPlayersInput, TournamentUpdateWithoutPlayersInput>, TournamentUncheckedUpdateWithoutPlayersInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumFriendStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendStatus | EnumFriendStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendStatus[]
    notIn?: $Enums.FriendStatus[]
    not?: NestedEnumFriendStatusFilter<$PrismaModel> | $Enums.FriendStatus
  }

  export type NestedEnumOnlineStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OnlineStatus | EnumOnlineStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OnlineStatus[]
    notIn?: $Enums.OnlineStatus[]
    not?: NestedEnumOnlineStatusFilter<$PrismaModel> | $Enums.OnlineStatus
  }

  export type NestedEnumFriendStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendStatus | EnumFriendStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendStatus[]
    notIn?: $Enums.FriendStatus[]
    not?: NestedEnumFriendStatusWithAggregatesFilter<$PrismaModel> | $Enums.FriendStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFriendStatusFilter<$PrismaModel>
    _max?: NestedEnumFriendStatusFilter<$PrismaModel>
  }

  export type NestedEnumOnlineStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OnlineStatus | EnumOnlineStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OnlineStatus[]
    notIn?: $Enums.OnlineStatus[]
    not?: NestedEnumOnlineStatusWithAggregatesFilter<$PrismaModel> | $Enums.OnlineStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOnlineStatusFilter<$PrismaModel>
    _max?: NestedEnumOnlineStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumMessageStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageStatus | EnumMessageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MessageStatus[]
    notIn?: $Enums.MessageStatus[]
    not?: NestedEnumMessageStatusFilter<$PrismaModel> | $Enums.MessageStatus
  }

  export type NestedEnumMessageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageStatus | EnumMessageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MessageStatus[]
    notIn?: $Enums.MessageStatus[]
    not?: NestedEnumMessageStatusWithAggregatesFilter<$PrismaModel> | $Enums.MessageStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageStatusFilter<$PrismaModel>
    _max?: NestedEnumMessageStatusFilter<$PrismaModel>
  }

  export type NestedEnumTournamentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TournamentStatus | EnumTournamentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TournamentStatus[]
    notIn?: $Enums.TournamentStatus[]
    not?: NestedEnumTournamentStatusFilter<$PrismaModel> | $Enums.TournamentStatus
  }

  export type NestedEnumTournamentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TournamentStatus | EnumTournamentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TournamentStatus[]
    notIn?: $Enums.TournamentStatus[]
    not?: NestedEnumTournamentStatusWithAggregatesFilter<$PrismaModel> | $Enums.TournamentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTournamentStatusFilter<$PrismaModel>
    _max?: NestedEnumTournamentStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FriendCreateWithoutSenderInput = {
    status?: $Enums.FriendStatus
    onlineStatus?: $Enums.OnlineStatus
    created_at?: Date | string
    updated_at?: Date | string
    receiver: UserCreateNestedOneWithoutFriendsReceivedInput
  }

  export type FriendUncheckedCreateWithoutSenderInput = {
    id?: number
    receiverId: number
    status?: $Enums.FriendStatus
    onlineStatus?: $Enums.OnlineStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FriendCreateOrConnectWithoutSenderInput = {
    where: FriendWhereUniqueInput
    create: XOR<FriendCreateWithoutSenderInput, FriendUncheckedCreateWithoutSenderInput>
  }

  export type FriendCreateManySenderInputEnvelope = {
    data: FriendCreateManySenderInput | FriendCreateManySenderInput[]
  }

  export type FriendCreateWithoutReceiverInput = {
    status?: $Enums.FriendStatus
    onlineStatus?: $Enums.OnlineStatus
    created_at?: Date | string
    updated_at?: Date | string
    sender: UserCreateNestedOneWithoutFriendsSentInput
  }

  export type FriendUncheckedCreateWithoutReceiverInput = {
    id?: number
    senderId: number
    status?: $Enums.FriendStatus
    onlineStatus?: $Enums.OnlineStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FriendCreateOrConnectWithoutReceiverInput = {
    where: FriendWhereUniqueInput
    create: XOR<FriendCreateWithoutReceiverInput, FriendUncheckedCreateWithoutReceiverInput>
  }

  export type FriendCreateManyReceiverInputEnvelope = {
    data: FriendCreateManyReceiverInput | FriendCreateManyReceiverInput[]
  }

  export type MatchCreateWithoutPlayer1Input = {
    player2Name: string
    winnerName: string
    score_p1: number
    score_p2: number
    gameType?: string
    played_at?: Date | string
    winner?: UserCreateNestedOneWithoutMatchesWonInput
    tournamentMatch?: TournamentMatchCreateNestedOneWithoutMatchInput
  }

  export type MatchUncheckedCreateWithoutPlayer1Input = {
    id?: number
    player2Name: string
    winnerId?: number | null
    winnerName: string
    score_p1: number
    score_p2: number
    gameType?: string
    played_at?: Date | string
    tournamentMatch?: TournamentMatchUncheckedCreateNestedOneWithoutMatchInput
  }

  export type MatchCreateOrConnectWithoutPlayer1Input = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutPlayer1Input, MatchUncheckedCreateWithoutPlayer1Input>
  }

  export type MatchCreateManyPlayer1InputEnvelope = {
    data: MatchCreateManyPlayer1Input | MatchCreateManyPlayer1Input[]
  }

  export type MatchCreateWithoutWinnerInput = {
    player2Name: string
    winnerName: string
    score_p1: number
    score_p2: number
    gameType?: string
    played_at?: Date | string
    player1: UserCreateNestedOneWithoutMatchesAsPlayer1Input
    tournamentMatch?: TournamentMatchCreateNestedOneWithoutMatchInput
  }

  export type MatchUncheckedCreateWithoutWinnerInput = {
    id?: number
    player1Id: number
    player2Name: string
    winnerName: string
    score_p1: number
    score_p2: number
    gameType?: string
    played_at?: Date | string
    tournamentMatch?: TournamentMatchUncheckedCreateNestedOneWithoutMatchInput
  }

  export type MatchCreateOrConnectWithoutWinnerInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutWinnerInput, MatchUncheckedCreateWithoutWinnerInput>
  }

  export type MatchCreateManyWinnerInputEnvelope = {
    data: MatchCreateManyWinnerInput | MatchCreateManyWinnerInput[]
  }

  export type MessageCreateWithoutSenderInput = {
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: $Enums.MessageStatus
    receiver: UserCreateNestedOneWithoutReceivedMessagesInput
  }

  export type MessageUncheckedCreateWithoutSenderInput = {
    id?: number
    receiverId: number
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: $Enums.MessageStatus
  }

  export type MessageCreateOrConnectWithoutSenderInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageCreateManySenderInputEnvelope = {
    data: MessageCreateManySenderInput | MessageCreateManySenderInput[]
  }

  export type MessageCreateWithoutReceiverInput = {
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: $Enums.MessageStatus
    sender: UserCreateNestedOneWithoutSentMessagesInput
  }

  export type MessageUncheckedCreateWithoutReceiverInput = {
    id?: number
    senderId: number
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: $Enums.MessageStatus
  }

  export type MessageCreateOrConnectWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput>
  }

  export type MessageCreateManyReceiverInputEnvelope = {
    data: MessageCreateManyReceiverInput | MessageCreateManyReceiverInput[]
  }

  export type TournamentCreateWithoutCreatedByInput = {
    name: string
    status?: $Enums.TournamentStatus
    winnerName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    players?: TournamentPlayerCreateNestedManyWithoutTournamentInput
    matches?: TournamentMatchCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateWithoutCreatedByInput = {
    id?: number
    name: string
    status?: $Enums.TournamentStatus
    winnerName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    players?: TournamentPlayerUncheckedCreateNestedManyWithoutTournamentInput
    matches?: TournamentMatchUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentCreateOrConnectWithoutCreatedByInput = {
    where: TournamentWhereUniqueInput
    create: XOR<TournamentCreateWithoutCreatedByInput, TournamentUncheckedCreateWithoutCreatedByInput>
  }

  export type TournamentCreateManyCreatedByInputEnvelope = {
    data: TournamentCreateManyCreatedByInput | TournamentCreateManyCreatedByInput[]
  }

  export type FriendUpsertWithWhereUniqueWithoutSenderInput = {
    where: FriendWhereUniqueInput
    update: XOR<FriendUpdateWithoutSenderInput, FriendUncheckedUpdateWithoutSenderInput>
    create: XOR<FriendCreateWithoutSenderInput, FriendUncheckedCreateWithoutSenderInput>
  }

  export type FriendUpdateWithWhereUniqueWithoutSenderInput = {
    where: FriendWhereUniqueInput
    data: XOR<FriendUpdateWithoutSenderInput, FriendUncheckedUpdateWithoutSenderInput>
  }

  export type FriendUpdateManyWithWhereWithoutSenderInput = {
    where: FriendScalarWhereInput
    data: XOR<FriendUpdateManyMutationInput, FriendUncheckedUpdateManyWithoutSenderInput>
  }

  export type FriendScalarWhereInput = {
    AND?: FriendScalarWhereInput | FriendScalarWhereInput[]
    OR?: FriendScalarWhereInput[]
    NOT?: FriendScalarWhereInput | FriendScalarWhereInput[]
    id?: IntFilter<"Friend"> | number
    senderId?: IntFilter<"Friend"> | number
    receiverId?: IntFilter<"Friend"> | number
    status?: EnumFriendStatusFilter<"Friend"> | $Enums.FriendStatus
    onlineStatus?: EnumOnlineStatusFilter<"Friend"> | $Enums.OnlineStatus
    created_at?: DateTimeFilter<"Friend"> | Date | string
    updated_at?: DateTimeFilter<"Friend"> | Date | string
  }

  export type FriendUpsertWithWhereUniqueWithoutReceiverInput = {
    where: FriendWhereUniqueInput
    update: XOR<FriendUpdateWithoutReceiverInput, FriendUncheckedUpdateWithoutReceiverInput>
    create: XOR<FriendCreateWithoutReceiverInput, FriendUncheckedCreateWithoutReceiverInput>
  }

  export type FriendUpdateWithWhereUniqueWithoutReceiverInput = {
    where: FriendWhereUniqueInput
    data: XOR<FriendUpdateWithoutReceiverInput, FriendUncheckedUpdateWithoutReceiverInput>
  }

  export type FriendUpdateManyWithWhereWithoutReceiverInput = {
    where: FriendScalarWhereInput
    data: XOR<FriendUpdateManyMutationInput, FriendUncheckedUpdateManyWithoutReceiverInput>
  }

  export type MatchUpsertWithWhereUniqueWithoutPlayer1Input = {
    where: MatchWhereUniqueInput
    update: XOR<MatchUpdateWithoutPlayer1Input, MatchUncheckedUpdateWithoutPlayer1Input>
    create: XOR<MatchCreateWithoutPlayer1Input, MatchUncheckedCreateWithoutPlayer1Input>
  }

  export type MatchUpdateWithWhereUniqueWithoutPlayer1Input = {
    where: MatchWhereUniqueInput
    data: XOR<MatchUpdateWithoutPlayer1Input, MatchUncheckedUpdateWithoutPlayer1Input>
  }

  export type MatchUpdateManyWithWhereWithoutPlayer1Input = {
    where: MatchScalarWhereInput
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyWithoutPlayer1Input>
  }

  export type MatchScalarWhereInput = {
    AND?: MatchScalarWhereInput | MatchScalarWhereInput[]
    OR?: MatchScalarWhereInput[]
    NOT?: MatchScalarWhereInput | MatchScalarWhereInput[]
    id?: IntFilter<"Match"> | number
    player1Id?: IntFilter<"Match"> | number
    player2Name?: StringFilter<"Match"> | string
    winnerId?: IntNullableFilter<"Match"> | number | null
    winnerName?: StringFilter<"Match"> | string
    score_p1?: IntFilter<"Match"> | number
    score_p2?: IntFilter<"Match"> | number
    gameType?: StringFilter<"Match"> | string
    played_at?: DateTimeFilter<"Match"> | Date | string
  }

  export type MatchUpsertWithWhereUniqueWithoutWinnerInput = {
    where: MatchWhereUniqueInput
    update: XOR<MatchUpdateWithoutWinnerInput, MatchUncheckedUpdateWithoutWinnerInput>
    create: XOR<MatchCreateWithoutWinnerInput, MatchUncheckedCreateWithoutWinnerInput>
  }

  export type MatchUpdateWithWhereUniqueWithoutWinnerInput = {
    where: MatchWhereUniqueInput
    data: XOR<MatchUpdateWithoutWinnerInput, MatchUncheckedUpdateWithoutWinnerInput>
  }

  export type MatchUpdateManyWithWhereWithoutWinnerInput = {
    where: MatchScalarWhereInput
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyWithoutWinnerInput>
  }

  export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
  }

  export type MessageUpdateManyWithWhereWithoutSenderInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutSenderInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: IntFilter<"Message"> | number
    senderId?: IntFilter<"Message"> | number
    receiverId?: IntFilter<"Message"> | number
    content?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    status?: EnumMessageStatusFilter<"Message"> | $Enums.MessageStatus
  }

  export type MessageUpsertWithWhereUniqueWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutReceiverInput, MessageUncheckedUpdateWithoutReceiverInput>
    create: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutReceiverInput, MessageUncheckedUpdateWithoutReceiverInput>
  }

  export type MessageUpdateManyWithWhereWithoutReceiverInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutReceiverInput>
  }

  export type TournamentUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: TournamentWhereUniqueInput
    update: XOR<TournamentUpdateWithoutCreatedByInput, TournamentUncheckedUpdateWithoutCreatedByInput>
    create: XOR<TournamentCreateWithoutCreatedByInput, TournamentUncheckedCreateWithoutCreatedByInput>
  }

  export type TournamentUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: TournamentWhereUniqueInput
    data: XOR<TournamentUpdateWithoutCreatedByInput, TournamentUncheckedUpdateWithoutCreatedByInput>
  }

  export type TournamentUpdateManyWithWhereWithoutCreatedByInput = {
    where: TournamentScalarWhereInput
    data: XOR<TournamentUpdateManyMutationInput, TournamentUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type TournamentScalarWhereInput = {
    AND?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
    OR?: TournamentScalarWhereInput[]
    NOT?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
    id?: IntFilter<"Tournament"> | number
    name?: StringFilter<"Tournament"> | string
    status?: EnumTournamentStatusFilter<"Tournament"> | $Enums.TournamentStatus
    createdById?: IntFilter<"Tournament"> | number
    winnerName?: StringNullableFilter<"Tournament"> | string | null
    createdAt?: DateTimeFilter<"Tournament"> | Date | string
    updatedAt?: DateTimeFilter<"Tournament"> | Date | string
  }

  export type UserCreateWithoutFriendsSentInput = {
    google_id?: string | null
    username: string
    email: string
    password?: string | null
    avatar_url?: string | null
    display_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    totp_secret?: string | null
    friendsReceived?: FriendCreateNestedManyWithoutReceiverInput
    matchesAsPlayer1?: MatchCreateNestedManyWithoutPlayer1Input
    matchesWon?: MatchCreateNestedManyWithoutWinnerInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    createdTournaments?: TournamentCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutFriendsSentInput = {
    id?: number
    google_id?: string | null
    username: string
    email: string
    password?: string | null
    avatar_url?: string | null
    display_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    totp_secret?: string | null
    friendsReceived?: FriendUncheckedCreateNestedManyWithoutReceiverInput
    matchesAsPlayer1?: MatchUncheckedCreateNestedManyWithoutPlayer1Input
    matchesWon?: MatchUncheckedCreateNestedManyWithoutWinnerInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    createdTournaments?: TournamentUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutFriendsSentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendsSentInput, UserUncheckedCreateWithoutFriendsSentInput>
  }

  export type UserCreateWithoutFriendsReceivedInput = {
    google_id?: string | null
    username: string
    email: string
    password?: string | null
    avatar_url?: string | null
    display_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    totp_secret?: string | null
    friendsSent?: FriendCreateNestedManyWithoutSenderInput
    matchesAsPlayer1?: MatchCreateNestedManyWithoutPlayer1Input
    matchesWon?: MatchCreateNestedManyWithoutWinnerInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    createdTournaments?: TournamentCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutFriendsReceivedInput = {
    id?: number
    google_id?: string | null
    username: string
    email: string
    password?: string | null
    avatar_url?: string | null
    display_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    totp_secret?: string | null
    friendsSent?: FriendUncheckedCreateNestedManyWithoutSenderInput
    matchesAsPlayer1?: MatchUncheckedCreateNestedManyWithoutPlayer1Input
    matchesWon?: MatchUncheckedCreateNestedManyWithoutWinnerInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    createdTournaments?: TournamentUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutFriendsReceivedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendsReceivedInput, UserUncheckedCreateWithoutFriendsReceivedInput>
  }

  export type UserUpsertWithoutFriendsSentInput = {
    update: XOR<UserUpdateWithoutFriendsSentInput, UserUncheckedUpdateWithoutFriendsSentInput>
    create: XOR<UserCreateWithoutFriendsSentInput, UserUncheckedCreateWithoutFriendsSentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriendsSentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriendsSentInput, UserUncheckedUpdateWithoutFriendsSentInput>
  }

  export type UserUpdateWithoutFriendsSentInput = {
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    friendsReceived?: FriendUpdateManyWithoutReceiverNestedInput
    matchesAsPlayer1?: MatchUpdateManyWithoutPlayer1NestedInput
    matchesWon?: MatchUpdateManyWithoutWinnerNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    createdTournaments?: TournamentUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendsSentInput = {
    id?: IntFieldUpdateOperationsInput | number
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    friendsReceived?: FriendUncheckedUpdateManyWithoutReceiverNestedInput
    matchesAsPlayer1?: MatchUncheckedUpdateManyWithoutPlayer1NestedInput
    matchesWon?: MatchUncheckedUpdateManyWithoutWinnerNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    createdTournaments?: TournamentUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUpsertWithoutFriendsReceivedInput = {
    update: XOR<UserUpdateWithoutFriendsReceivedInput, UserUncheckedUpdateWithoutFriendsReceivedInput>
    create: XOR<UserCreateWithoutFriendsReceivedInput, UserUncheckedCreateWithoutFriendsReceivedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriendsReceivedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriendsReceivedInput, UserUncheckedUpdateWithoutFriendsReceivedInput>
  }

  export type UserUpdateWithoutFriendsReceivedInput = {
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    friendsSent?: FriendUpdateManyWithoutSenderNestedInput
    matchesAsPlayer1?: MatchUpdateManyWithoutPlayer1NestedInput
    matchesWon?: MatchUpdateManyWithoutWinnerNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    createdTournaments?: TournamentUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendsReceivedInput = {
    id?: IntFieldUpdateOperationsInput | number
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    friendsSent?: FriendUncheckedUpdateManyWithoutSenderNestedInput
    matchesAsPlayer1?: MatchUncheckedUpdateManyWithoutPlayer1NestedInput
    matchesWon?: MatchUncheckedUpdateManyWithoutWinnerNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    createdTournaments?: TournamentUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateWithoutMatchesAsPlayer1Input = {
    google_id?: string | null
    username: string
    email: string
    password?: string | null
    avatar_url?: string | null
    display_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    totp_secret?: string | null
    friendsSent?: FriendCreateNestedManyWithoutSenderInput
    friendsReceived?: FriendCreateNestedManyWithoutReceiverInput
    matchesWon?: MatchCreateNestedManyWithoutWinnerInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    createdTournaments?: TournamentCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutMatchesAsPlayer1Input = {
    id?: number
    google_id?: string | null
    username: string
    email: string
    password?: string | null
    avatar_url?: string | null
    display_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    totp_secret?: string | null
    friendsSent?: FriendUncheckedCreateNestedManyWithoutSenderInput
    friendsReceived?: FriendUncheckedCreateNestedManyWithoutReceiverInput
    matchesWon?: MatchUncheckedCreateNestedManyWithoutWinnerInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    createdTournaments?: TournamentUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutMatchesAsPlayer1Input = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMatchesAsPlayer1Input, UserUncheckedCreateWithoutMatchesAsPlayer1Input>
  }

  export type UserCreateWithoutMatchesWonInput = {
    google_id?: string | null
    username: string
    email: string
    password?: string | null
    avatar_url?: string | null
    display_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    totp_secret?: string | null
    friendsSent?: FriendCreateNestedManyWithoutSenderInput
    friendsReceived?: FriendCreateNestedManyWithoutReceiverInput
    matchesAsPlayer1?: MatchCreateNestedManyWithoutPlayer1Input
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    createdTournaments?: TournamentCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutMatchesWonInput = {
    id?: number
    google_id?: string | null
    username: string
    email: string
    password?: string | null
    avatar_url?: string | null
    display_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    totp_secret?: string | null
    friendsSent?: FriendUncheckedCreateNestedManyWithoutSenderInput
    friendsReceived?: FriendUncheckedCreateNestedManyWithoutReceiverInput
    matchesAsPlayer1?: MatchUncheckedCreateNestedManyWithoutPlayer1Input
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    createdTournaments?: TournamentUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutMatchesWonInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMatchesWonInput, UserUncheckedCreateWithoutMatchesWonInput>
  }

  export type TournamentMatchCreateWithoutMatchInput = {
    roundNumber: number
    matchNumber: number
    player1Name: string
    player2Name: string
    winnerName?: string | null
    isBye?: boolean
    tournament: TournamentCreateNestedOneWithoutMatchesInput
  }

  export type TournamentMatchUncheckedCreateWithoutMatchInput = {
    id?: number
    tournamentId: number
    roundNumber: number
    matchNumber: number
    player1Name: string
    player2Name: string
    winnerName?: string | null
    isBye?: boolean
  }

  export type TournamentMatchCreateOrConnectWithoutMatchInput = {
    where: TournamentMatchWhereUniqueInput
    create: XOR<TournamentMatchCreateWithoutMatchInput, TournamentMatchUncheckedCreateWithoutMatchInput>
  }

  export type UserUpsertWithoutMatchesAsPlayer1Input = {
    update: XOR<UserUpdateWithoutMatchesAsPlayer1Input, UserUncheckedUpdateWithoutMatchesAsPlayer1Input>
    create: XOR<UserCreateWithoutMatchesAsPlayer1Input, UserUncheckedCreateWithoutMatchesAsPlayer1Input>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMatchesAsPlayer1Input = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMatchesAsPlayer1Input, UserUncheckedUpdateWithoutMatchesAsPlayer1Input>
  }

  export type UserUpdateWithoutMatchesAsPlayer1Input = {
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    friendsSent?: FriendUpdateManyWithoutSenderNestedInput
    friendsReceived?: FriendUpdateManyWithoutReceiverNestedInput
    matchesWon?: MatchUpdateManyWithoutWinnerNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    createdTournaments?: TournamentUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutMatchesAsPlayer1Input = {
    id?: IntFieldUpdateOperationsInput | number
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    friendsSent?: FriendUncheckedUpdateManyWithoutSenderNestedInput
    friendsReceived?: FriendUncheckedUpdateManyWithoutReceiverNestedInput
    matchesWon?: MatchUncheckedUpdateManyWithoutWinnerNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    createdTournaments?: TournamentUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUpsertWithoutMatchesWonInput = {
    update: XOR<UserUpdateWithoutMatchesWonInput, UserUncheckedUpdateWithoutMatchesWonInput>
    create: XOR<UserCreateWithoutMatchesWonInput, UserUncheckedCreateWithoutMatchesWonInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMatchesWonInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMatchesWonInput, UserUncheckedUpdateWithoutMatchesWonInput>
  }

  export type UserUpdateWithoutMatchesWonInput = {
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    friendsSent?: FriendUpdateManyWithoutSenderNestedInput
    friendsReceived?: FriendUpdateManyWithoutReceiverNestedInput
    matchesAsPlayer1?: MatchUpdateManyWithoutPlayer1NestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    createdTournaments?: TournamentUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutMatchesWonInput = {
    id?: IntFieldUpdateOperationsInput | number
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    friendsSent?: FriendUncheckedUpdateManyWithoutSenderNestedInput
    friendsReceived?: FriendUncheckedUpdateManyWithoutReceiverNestedInput
    matchesAsPlayer1?: MatchUncheckedUpdateManyWithoutPlayer1NestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    createdTournaments?: TournamentUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type TournamentMatchUpsertWithoutMatchInput = {
    update: XOR<TournamentMatchUpdateWithoutMatchInput, TournamentMatchUncheckedUpdateWithoutMatchInput>
    create: XOR<TournamentMatchCreateWithoutMatchInput, TournamentMatchUncheckedCreateWithoutMatchInput>
    where?: TournamentMatchWhereInput
  }

  export type TournamentMatchUpdateToOneWithWhereWithoutMatchInput = {
    where?: TournamentMatchWhereInput
    data: XOR<TournamentMatchUpdateWithoutMatchInput, TournamentMatchUncheckedUpdateWithoutMatchInput>
  }

  export type TournamentMatchUpdateWithoutMatchInput = {
    roundNumber?: IntFieldUpdateOperationsInput | number
    matchNumber?: IntFieldUpdateOperationsInput | number
    player1Name?: StringFieldUpdateOperationsInput | string
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    isBye?: BoolFieldUpdateOperationsInput | boolean
    tournament?: TournamentUpdateOneRequiredWithoutMatchesNestedInput
  }

  export type TournamentMatchUncheckedUpdateWithoutMatchInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentId?: IntFieldUpdateOperationsInput | number
    roundNumber?: IntFieldUpdateOperationsInput | number
    matchNumber?: IntFieldUpdateOperationsInput | number
    player1Name?: StringFieldUpdateOperationsInput | string
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    isBye?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateWithoutSentMessagesInput = {
    google_id?: string | null
    username: string
    email: string
    password?: string | null
    avatar_url?: string | null
    display_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    totp_secret?: string | null
    friendsSent?: FriendCreateNestedManyWithoutSenderInput
    friendsReceived?: FriendCreateNestedManyWithoutReceiverInput
    matchesAsPlayer1?: MatchCreateNestedManyWithoutPlayer1Input
    matchesWon?: MatchCreateNestedManyWithoutWinnerInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    createdTournaments?: TournamentCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutSentMessagesInput = {
    id?: number
    google_id?: string | null
    username: string
    email: string
    password?: string | null
    avatar_url?: string | null
    display_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    totp_secret?: string | null
    friendsSent?: FriendUncheckedCreateNestedManyWithoutSenderInput
    friendsReceived?: FriendUncheckedCreateNestedManyWithoutReceiverInput
    matchesAsPlayer1?: MatchUncheckedCreateNestedManyWithoutPlayer1Input
    matchesWon?: MatchUncheckedCreateNestedManyWithoutWinnerInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    createdTournaments?: TournamentUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutSentMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
  }

  export type UserCreateWithoutReceivedMessagesInput = {
    google_id?: string | null
    username: string
    email: string
    password?: string | null
    avatar_url?: string | null
    display_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    totp_secret?: string | null
    friendsSent?: FriendCreateNestedManyWithoutSenderInput
    friendsReceived?: FriendCreateNestedManyWithoutReceiverInput
    matchesAsPlayer1?: MatchCreateNestedManyWithoutPlayer1Input
    matchesWon?: MatchCreateNestedManyWithoutWinnerInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    createdTournaments?: TournamentCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutReceivedMessagesInput = {
    id?: number
    google_id?: string | null
    username: string
    email: string
    password?: string | null
    avatar_url?: string | null
    display_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    totp_secret?: string | null
    friendsSent?: FriendUncheckedCreateNestedManyWithoutSenderInput
    friendsReceived?: FriendUncheckedCreateNestedManyWithoutReceiverInput
    matchesAsPlayer1?: MatchUncheckedCreateNestedManyWithoutPlayer1Input
    matchesWon?: MatchUncheckedCreateNestedManyWithoutWinnerInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    createdTournaments?: TournamentUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutReceivedMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
  }

  export type UserUpsertWithoutSentMessagesInput = {
    update: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type UserUpdateWithoutSentMessagesInput = {
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    friendsSent?: FriendUpdateManyWithoutSenderNestedInput
    friendsReceived?: FriendUpdateManyWithoutReceiverNestedInput
    matchesAsPlayer1?: MatchUpdateManyWithoutPlayer1NestedInput
    matchesWon?: MatchUpdateManyWithoutWinnerNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    createdTournaments?: TournamentUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutSentMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    friendsSent?: FriendUncheckedUpdateManyWithoutSenderNestedInput
    friendsReceived?: FriendUncheckedUpdateManyWithoutReceiverNestedInput
    matchesAsPlayer1?: MatchUncheckedUpdateManyWithoutPlayer1NestedInput
    matchesWon?: MatchUncheckedUpdateManyWithoutWinnerNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    createdTournaments?: TournamentUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUpsertWithoutReceivedMessagesInput = {
    update: XOR<UserUpdateWithoutReceivedMessagesInput, UserUncheckedUpdateWithoutReceivedMessagesInput>
    create: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedMessagesInput, UserUncheckedUpdateWithoutReceivedMessagesInput>
  }

  export type UserUpdateWithoutReceivedMessagesInput = {
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    friendsSent?: FriendUpdateManyWithoutSenderNestedInput
    friendsReceived?: FriendUpdateManyWithoutReceiverNestedInput
    matchesAsPlayer1?: MatchUpdateManyWithoutPlayer1NestedInput
    matchesWon?: MatchUpdateManyWithoutWinnerNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    createdTournaments?: TournamentUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    friendsSent?: FriendUncheckedUpdateManyWithoutSenderNestedInput
    friendsReceived?: FriendUncheckedUpdateManyWithoutReceiverNestedInput
    matchesAsPlayer1?: MatchUncheckedUpdateManyWithoutPlayer1NestedInput
    matchesWon?: MatchUncheckedUpdateManyWithoutWinnerNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    createdTournaments?: TournamentUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateWithoutCreatedTournamentsInput = {
    google_id?: string | null
    username: string
    email: string
    password?: string | null
    avatar_url?: string | null
    display_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    totp_secret?: string | null
    friendsSent?: FriendCreateNestedManyWithoutSenderInput
    friendsReceived?: FriendCreateNestedManyWithoutReceiverInput
    matchesAsPlayer1?: MatchCreateNestedManyWithoutPlayer1Input
    matchesWon?: MatchCreateNestedManyWithoutWinnerInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
  }

  export type UserUncheckedCreateWithoutCreatedTournamentsInput = {
    id?: number
    google_id?: string | null
    username: string
    email: string
    password?: string | null
    avatar_url?: string | null
    display_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    totp_secret?: string | null
    friendsSent?: FriendUncheckedCreateNestedManyWithoutSenderInput
    friendsReceived?: FriendUncheckedCreateNestedManyWithoutReceiverInput
    matchesAsPlayer1?: MatchUncheckedCreateNestedManyWithoutPlayer1Input
    matchesWon?: MatchUncheckedCreateNestedManyWithoutWinnerInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
  }

  export type UserCreateOrConnectWithoutCreatedTournamentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedTournamentsInput, UserUncheckedCreateWithoutCreatedTournamentsInput>
  }

  export type TournamentPlayerCreateWithoutTournamentInput = {
    playerName: string
    isUser?: boolean
    seed?: number | null
  }

  export type TournamentPlayerUncheckedCreateWithoutTournamentInput = {
    id?: number
    playerName: string
    isUser?: boolean
    seed?: number | null
  }

  export type TournamentPlayerCreateOrConnectWithoutTournamentInput = {
    where: TournamentPlayerWhereUniqueInput
    create: XOR<TournamentPlayerCreateWithoutTournamentInput, TournamentPlayerUncheckedCreateWithoutTournamentInput>
  }

  export type TournamentPlayerCreateManyTournamentInputEnvelope = {
    data: TournamentPlayerCreateManyTournamentInput | TournamentPlayerCreateManyTournamentInput[]
  }

  export type TournamentMatchCreateWithoutTournamentInput = {
    roundNumber: number
    matchNumber: number
    player1Name: string
    player2Name: string
    winnerName?: string | null
    isBye?: boolean
    match: MatchCreateNestedOneWithoutTournamentMatchInput
  }

  export type TournamentMatchUncheckedCreateWithoutTournamentInput = {
    id?: number
    matchId: number
    roundNumber: number
    matchNumber: number
    player1Name: string
    player2Name: string
    winnerName?: string | null
    isBye?: boolean
  }

  export type TournamentMatchCreateOrConnectWithoutTournamentInput = {
    where: TournamentMatchWhereUniqueInput
    create: XOR<TournamentMatchCreateWithoutTournamentInput, TournamentMatchUncheckedCreateWithoutTournamentInput>
  }

  export type TournamentMatchCreateManyTournamentInputEnvelope = {
    data: TournamentMatchCreateManyTournamentInput | TournamentMatchCreateManyTournamentInput[]
  }

  export type UserUpsertWithoutCreatedTournamentsInput = {
    update: XOR<UserUpdateWithoutCreatedTournamentsInput, UserUncheckedUpdateWithoutCreatedTournamentsInput>
    create: XOR<UserCreateWithoutCreatedTournamentsInput, UserUncheckedCreateWithoutCreatedTournamentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedTournamentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedTournamentsInput, UserUncheckedUpdateWithoutCreatedTournamentsInput>
  }

  export type UserUpdateWithoutCreatedTournamentsInput = {
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    friendsSent?: FriendUpdateManyWithoutSenderNestedInput
    friendsReceived?: FriendUpdateManyWithoutReceiverNestedInput
    matchesAsPlayer1?: MatchUpdateManyWithoutPlayer1NestedInput
    matchesWon?: MatchUpdateManyWithoutWinnerNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedTournamentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    display_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    totp_secret?: NullableStringFieldUpdateOperationsInput | string | null
    friendsSent?: FriendUncheckedUpdateManyWithoutSenderNestedInput
    friendsReceived?: FriendUncheckedUpdateManyWithoutReceiverNestedInput
    matchesAsPlayer1?: MatchUncheckedUpdateManyWithoutPlayer1NestedInput
    matchesWon?: MatchUncheckedUpdateManyWithoutWinnerNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
  }

  export type TournamentPlayerUpsertWithWhereUniqueWithoutTournamentInput = {
    where: TournamentPlayerWhereUniqueInput
    update: XOR<TournamentPlayerUpdateWithoutTournamentInput, TournamentPlayerUncheckedUpdateWithoutTournamentInput>
    create: XOR<TournamentPlayerCreateWithoutTournamentInput, TournamentPlayerUncheckedCreateWithoutTournamentInput>
  }

  export type TournamentPlayerUpdateWithWhereUniqueWithoutTournamentInput = {
    where: TournamentPlayerWhereUniqueInput
    data: XOR<TournamentPlayerUpdateWithoutTournamentInput, TournamentPlayerUncheckedUpdateWithoutTournamentInput>
  }

  export type TournamentPlayerUpdateManyWithWhereWithoutTournamentInput = {
    where: TournamentPlayerScalarWhereInput
    data: XOR<TournamentPlayerUpdateManyMutationInput, TournamentPlayerUncheckedUpdateManyWithoutTournamentInput>
  }

  export type TournamentPlayerScalarWhereInput = {
    AND?: TournamentPlayerScalarWhereInput | TournamentPlayerScalarWhereInput[]
    OR?: TournamentPlayerScalarWhereInput[]
    NOT?: TournamentPlayerScalarWhereInput | TournamentPlayerScalarWhereInput[]
    id?: IntFilter<"TournamentPlayer"> | number
    tournamentId?: IntFilter<"TournamentPlayer"> | number
    playerName?: StringFilter<"TournamentPlayer"> | string
    isUser?: BoolFilter<"TournamentPlayer"> | boolean
    seed?: IntNullableFilter<"TournamentPlayer"> | number | null
  }

  export type TournamentMatchUpsertWithWhereUniqueWithoutTournamentInput = {
    where: TournamentMatchWhereUniqueInput
    update: XOR<TournamentMatchUpdateWithoutTournamentInput, TournamentMatchUncheckedUpdateWithoutTournamentInput>
    create: XOR<TournamentMatchCreateWithoutTournamentInput, TournamentMatchUncheckedCreateWithoutTournamentInput>
  }

  export type TournamentMatchUpdateWithWhereUniqueWithoutTournamentInput = {
    where: TournamentMatchWhereUniqueInput
    data: XOR<TournamentMatchUpdateWithoutTournamentInput, TournamentMatchUncheckedUpdateWithoutTournamentInput>
  }

  export type TournamentMatchUpdateManyWithWhereWithoutTournamentInput = {
    where: TournamentMatchScalarWhereInput
    data: XOR<TournamentMatchUpdateManyMutationInput, TournamentMatchUncheckedUpdateManyWithoutTournamentInput>
  }

  export type TournamentMatchScalarWhereInput = {
    AND?: TournamentMatchScalarWhereInput | TournamentMatchScalarWhereInput[]
    OR?: TournamentMatchScalarWhereInput[]
    NOT?: TournamentMatchScalarWhereInput | TournamentMatchScalarWhereInput[]
    id?: IntFilter<"TournamentMatch"> | number
    tournamentId?: IntFilter<"TournamentMatch"> | number
    matchId?: IntFilter<"TournamentMatch"> | number
    roundNumber?: IntFilter<"TournamentMatch"> | number
    matchNumber?: IntFilter<"TournamentMatch"> | number
    player1Name?: StringFilter<"TournamentMatch"> | string
    player2Name?: StringFilter<"TournamentMatch"> | string
    winnerName?: StringNullableFilter<"TournamentMatch"> | string | null
    isBye?: BoolFilter<"TournamentMatch"> | boolean
  }

  export type TournamentCreateWithoutMatchesInput = {
    name: string
    status?: $Enums.TournamentStatus
    winnerName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedTournamentsInput
    players?: TournamentPlayerCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateWithoutMatchesInput = {
    id?: number
    name: string
    status?: $Enums.TournamentStatus
    createdById: number
    winnerName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    players?: TournamentPlayerUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentCreateOrConnectWithoutMatchesInput = {
    where: TournamentWhereUniqueInput
    create: XOR<TournamentCreateWithoutMatchesInput, TournamentUncheckedCreateWithoutMatchesInput>
  }

  export type MatchCreateWithoutTournamentMatchInput = {
    player2Name: string
    winnerName: string
    score_p1: number
    score_p2: number
    gameType?: string
    played_at?: Date | string
    player1: UserCreateNestedOneWithoutMatchesAsPlayer1Input
    winner?: UserCreateNestedOneWithoutMatchesWonInput
  }

  export type MatchUncheckedCreateWithoutTournamentMatchInput = {
    id?: number
    player1Id: number
    player2Name: string
    winnerId?: number | null
    winnerName: string
    score_p1: number
    score_p2: number
    gameType?: string
    played_at?: Date | string
  }

  export type MatchCreateOrConnectWithoutTournamentMatchInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutTournamentMatchInput, MatchUncheckedCreateWithoutTournamentMatchInput>
  }

  export type TournamentUpsertWithoutMatchesInput = {
    update: XOR<TournamentUpdateWithoutMatchesInput, TournamentUncheckedUpdateWithoutMatchesInput>
    create: XOR<TournamentCreateWithoutMatchesInput, TournamentUncheckedCreateWithoutMatchesInput>
    where?: TournamentWhereInput
  }

  export type TournamentUpdateToOneWithWhereWithoutMatchesInput = {
    where?: TournamentWhereInput
    data: XOR<TournamentUpdateWithoutMatchesInput, TournamentUncheckedUpdateWithoutMatchesInput>
  }

  export type TournamentUpdateWithoutMatchesInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumTournamentStatusFieldUpdateOperationsInput | $Enums.TournamentStatus
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedTournamentsNestedInput
    players?: TournamentPlayerUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateWithoutMatchesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumTournamentStatusFieldUpdateOperationsInput | $Enums.TournamentStatus
    createdById?: IntFieldUpdateOperationsInput | number
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: TournamentPlayerUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type MatchUpsertWithoutTournamentMatchInput = {
    update: XOR<MatchUpdateWithoutTournamentMatchInput, MatchUncheckedUpdateWithoutTournamentMatchInput>
    create: XOR<MatchCreateWithoutTournamentMatchInput, MatchUncheckedCreateWithoutTournamentMatchInput>
    where?: MatchWhereInput
  }

  export type MatchUpdateToOneWithWhereWithoutTournamentMatchInput = {
    where?: MatchWhereInput
    data: XOR<MatchUpdateWithoutTournamentMatchInput, MatchUncheckedUpdateWithoutTournamentMatchInput>
  }

  export type MatchUpdateWithoutTournamentMatchInput = {
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerName?: StringFieldUpdateOperationsInput | string
    score_p1?: IntFieldUpdateOperationsInput | number
    score_p2?: IntFieldUpdateOperationsInput | number
    gameType?: StringFieldUpdateOperationsInput | string
    played_at?: DateTimeFieldUpdateOperationsInput | Date | string
    player1?: UserUpdateOneRequiredWithoutMatchesAsPlayer1NestedInput
    winner?: UserUpdateOneWithoutMatchesWonNestedInput
  }

  export type MatchUncheckedUpdateWithoutTournamentMatchInput = {
    id?: IntFieldUpdateOperationsInput | number
    player1Id?: IntFieldUpdateOperationsInput | number
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    winnerName?: StringFieldUpdateOperationsInput | string
    score_p1?: IntFieldUpdateOperationsInput | number
    score_p2?: IntFieldUpdateOperationsInput | number
    gameType?: StringFieldUpdateOperationsInput | string
    played_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentCreateWithoutPlayersInput = {
    name: string
    status?: $Enums.TournamentStatus
    winnerName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedTournamentsInput
    matches?: TournamentMatchCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateWithoutPlayersInput = {
    id?: number
    name: string
    status?: $Enums.TournamentStatus
    createdById: number
    winnerName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    matches?: TournamentMatchUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentCreateOrConnectWithoutPlayersInput = {
    where: TournamentWhereUniqueInput
    create: XOR<TournamentCreateWithoutPlayersInput, TournamentUncheckedCreateWithoutPlayersInput>
  }

  export type TournamentUpsertWithoutPlayersInput = {
    update: XOR<TournamentUpdateWithoutPlayersInput, TournamentUncheckedUpdateWithoutPlayersInput>
    create: XOR<TournamentCreateWithoutPlayersInput, TournamentUncheckedCreateWithoutPlayersInput>
    where?: TournamentWhereInput
  }

  export type TournamentUpdateToOneWithWhereWithoutPlayersInput = {
    where?: TournamentWhereInput
    data: XOR<TournamentUpdateWithoutPlayersInput, TournamentUncheckedUpdateWithoutPlayersInput>
  }

  export type TournamentUpdateWithoutPlayersInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumTournamentStatusFieldUpdateOperationsInput | $Enums.TournamentStatus
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedTournamentsNestedInput
    matches?: TournamentMatchUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateWithoutPlayersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumTournamentStatusFieldUpdateOperationsInput | $Enums.TournamentStatus
    createdById?: IntFieldUpdateOperationsInput | number
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matches?: TournamentMatchUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type FriendCreateManySenderInput = {
    id?: number
    receiverId: number
    status?: $Enums.FriendStatus
    onlineStatus?: $Enums.OnlineStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FriendCreateManyReceiverInput = {
    id?: number
    senderId: number
    status?: $Enums.FriendStatus
    onlineStatus?: $Enums.OnlineStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MatchCreateManyPlayer1Input = {
    id?: number
    player2Name: string
    winnerId?: number | null
    winnerName: string
    score_p1: number
    score_p2: number
    gameType?: string
    played_at?: Date | string
  }

  export type MatchCreateManyWinnerInput = {
    id?: number
    player1Id: number
    player2Name: string
    winnerName: string
    score_p1: number
    score_p2: number
    gameType?: string
    played_at?: Date | string
  }

  export type MessageCreateManySenderInput = {
    id?: number
    receiverId: number
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: $Enums.MessageStatus
  }

  export type MessageCreateManyReceiverInput = {
    id?: number
    senderId: number
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    status?: $Enums.MessageStatus
  }

  export type TournamentCreateManyCreatedByInput = {
    id?: number
    name: string
    status?: $Enums.TournamentStatus
    winnerName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendUpdateWithoutSenderInput = {
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    onlineStatus?: EnumOnlineStatusFieldUpdateOperationsInput | $Enums.OnlineStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    receiver?: UserUpdateOneRequiredWithoutFriendsReceivedNestedInput
  }

  export type FriendUncheckedUpdateWithoutSenderInput = {
    id?: IntFieldUpdateOperationsInput | number
    receiverId?: IntFieldUpdateOperationsInput | number
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    onlineStatus?: EnumOnlineStatusFieldUpdateOperationsInput | $Enums.OnlineStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendUncheckedUpdateManyWithoutSenderInput = {
    id?: IntFieldUpdateOperationsInput | number
    receiverId?: IntFieldUpdateOperationsInput | number
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    onlineStatus?: EnumOnlineStatusFieldUpdateOperationsInput | $Enums.OnlineStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendUpdateWithoutReceiverInput = {
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    onlineStatus?: EnumOnlineStatusFieldUpdateOperationsInput | $Enums.OnlineStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutFriendsSentNestedInput
  }

  export type FriendUncheckedUpdateWithoutReceiverInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    onlineStatus?: EnumOnlineStatusFieldUpdateOperationsInput | $Enums.OnlineStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendUncheckedUpdateManyWithoutReceiverInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    onlineStatus?: EnumOnlineStatusFieldUpdateOperationsInput | $Enums.OnlineStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchUpdateWithoutPlayer1Input = {
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerName?: StringFieldUpdateOperationsInput | string
    score_p1?: IntFieldUpdateOperationsInput | number
    score_p2?: IntFieldUpdateOperationsInput | number
    gameType?: StringFieldUpdateOperationsInput | string
    played_at?: DateTimeFieldUpdateOperationsInput | Date | string
    winner?: UserUpdateOneWithoutMatchesWonNestedInput
    tournamentMatch?: TournamentMatchUpdateOneWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateWithoutPlayer1Input = {
    id?: IntFieldUpdateOperationsInput | number
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    winnerName?: StringFieldUpdateOperationsInput | string
    score_p1?: IntFieldUpdateOperationsInput | number
    score_p2?: IntFieldUpdateOperationsInput | number
    gameType?: StringFieldUpdateOperationsInput | string
    played_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tournamentMatch?: TournamentMatchUncheckedUpdateOneWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateManyWithoutPlayer1Input = {
    id?: IntFieldUpdateOperationsInput | number
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    winnerName?: StringFieldUpdateOperationsInput | string
    score_p1?: IntFieldUpdateOperationsInput | number
    score_p2?: IntFieldUpdateOperationsInput | number
    gameType?: StringFieldUpdateOperationsInput | string
    played_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchUpdateWithoutWinnerInput = {
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerName?: StringFieldUpdateOperationsInput | string
    score_p1?: IntFieldUpdateOperationsInput | number
    score_p2?: IntFieldUpdateOperationsInput | number
    gameType?: StringFieldUpdateOperationsInput | string
    played_at?: DateTimeFieldUpdateOperationsInput | Date | string
    player1?: UserUpdateOneRequiredWithoutMatchesAsPlayer1NestedInput
    tournamentMatch?: TournamentMatchUpdateOneWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateWithoutWinnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    player1Id?: IntFieldUpdateOperationsInput | number
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerName?: StringFieldUpdateOperationsInput | string
    score_p1?: IntFieldUpdateOperationsInput | number
    score_p2?: IntFieldUpdateOperationsInput | number
    gameType?: StringFieldUpdateOperationsInput | string
    played_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tournamentMatch?: TournamentMatchUncheckedUpdateOneWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateManyWithoutWinnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    player1Id?: IntFieldUpdateOperationsInput | number
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerName?: StringFieldUpdateOperationsInput | string
    score_p1?: IntFieldUpdateOperationsInput | number
    score_p2?: IntFieldUpdateOperationsInput | number
    gameType?: StringFieldUpdateOperationsInput | string
    played_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutSenderInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
    receiver?: UserUpdateOneRequiredWithoutReceivedMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutSenderInput = {
    id?: IntFieldUpdateOperationsInput | number
    receiverId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
  }

  export type MessageUncheckedUpdateManyWithoutSenderInput = {
    id?: IntFieldUpdateOperationsInput | number
    receiverId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
  }

  export type MessageUpdateWithoutReceiverInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutReceiverInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
  }

  export type MessageUncheckedUpdateManyWithoutReceiverInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus
  }

  export type TournamentUpdateWithoutCreatedByInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumTournamentStatusFieldUpdateOperationsInput | $Enums.TournamentStatus
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: TournamentPlayerUpdateManyWithoutTournamentNestedInput
    matches?: TournamentMatchUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumTournamentStatusFieldUpdateOperationsInput | $Enums.TournamentStatus
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: TournamentPlayerUncheckedUpdateManyWithoutTournamentNestedInput
    matches?: TournamentMatchUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateManyWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumTournamentStatusFieldUpdateOperationsInput | $Enums.TournamentStatus
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentPlayerCreateManyTournamentInput = {
    id?: number
    playerName: string
    isUser?: boolean
    seed?: number | null
  }

  export type TournamentMatchCreateManyTournamentInput = {
    id?: number
    matchId: number
    roundNumber: number
    matchNumber: number
    player1Name: string
    player2Name: string
    winnerName?: string | null
    isBye?: boolean
  }

  export type TournamentPlayerUpdateWithoutTournamentInput = {
    playerName?: StringFieldUpdateOperationsInput | string
    isUser?: BoolFieldUpdateOperationsInput | boolean
    seed?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TournamentPlayerUncheckedUpdateWithoutTournamentInput = {
    id?: IntFieldUpdateOperationsInput | number
    playerName?: StringFieldUpdateOperationsInput | string
    isUser?: BoolFieldUpdateOperationsInput | boolean
    seed?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TournamentPlayerUncheckedUpdateManyWithoutTournamentInput = {
    id?: IntFieldUpdateOperationsInput | number
    playerName?: StringFieldUpdateOperationsInput | string
    isUser?: BoolFieldUpdateOperationsInput | boolean
    seed?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TournamentMatchUpdateWithoutTournamentInput = {
    roundNumber?: IntFieldUpdateOperationsInput | number
    matchNumber?: IntFieldUpdateOperationsInput | number
    player1Name?: StringFieldUpdateOperationsInput | string
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    isBye?: BoolFieldUpdateOperationsInput | boolean
    match?: MatchUpdateOneRequiredWithoutTournamentMatchNestedInput
  }

  export type TournamentMatchUncheckedUpdateWithoutTournamentInput = {
    id?: IntFieldUpdateOperationsInput | number
    matchId?: IntFieldUpdateOperationsInput | number
    roundNumber?: IntFieldUpdateOperationsInput | number
    matchNumber?: IntFieldUpdateOperationsInput | number
    player1Name?: StringFieldUpdateOperationsInput | string
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    isBye?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TournamentMatchUncheckedUpdateManyWithoutTournamentInput = {
    id?: IntFieldUpdateOperationsInput | number
    matchId?: IntFieldUpdateOperationsInput | number
    roundNumber?: IntFieldUpdateOperationsInput | number
    matchNumber?: IntFieldUpdateOperationsInput | number
    player1Name?: StringFieldUpdateOperationsInput | string
    player2Name?: StringFieldUpdateOperationsInput | string
    winnerName?: NullableStringFieldUpdateOperationsInput | string | null
    isBye?: BoolFieldUpdateOperationsInput | boolean
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