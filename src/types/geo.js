/**
 * @typedef {[number, number]} Coordinate
 * Represents a [longitude, latitude] pair.
 */

/**
 * @typedef {Object} GeoPoint
 * @property {"Point"} type
 * @property {Coordinate} coordinates
 */

/**
 * @typedef {Object} GeoLine
 * @property {"LineString"} type
 * @property {Coordinate[]} coordinates
 */

/**
 * @typedef {Object} GeoPolygon
 * @property {"Polygon" | "MultiPolygon"} type
 * @property {Coordinate[][] | Coordinate[][][]} coordinates
 */

/**
 * @typedef {GeoPoint | GeoLine | GeoPolygon} Geometry
 */

/**
 * @template {Geometry} T
 * @template P
 * @typedef {Object} GeoFeature
 * @property {"Feature"} type
 * @property {T} geometry
 * @property {P} properties
 */

/**
 * @template {Geometry} T
 * @template P
 * @typedef {Object} FeatureCollection
 * @property {"FeatureCollection"} type
 * @property {GeoFeature<T,P>[]} features
 */

/**
 * @typedef {"plant" | "renewable" | "demand" | "pipeline"} AssetType
 */

/**
 * @typedef {GeoFeature<Geometry, {id?: string, name?: string, type: AssetType}>} AssetFeature
 */

/**
 * @typedef {GeoFeature<GeoPolygon, {id?: string, name?: string, kind: "protected" | "regulatory"}>} ZoneFeature
 */
