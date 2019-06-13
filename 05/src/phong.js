import Vector from "./vector.js";

/**
 * Calculate the colour of an object at the intersection point according to the Phong Lighting model.
 * @param {Vector} color               - The colour of the intersected object
 * @param {Intersection} intersection     - The intersection information
 * @param {Array.<Vector>} lightPositions - The light positions
 * @param {number} shininess              - The shininess parameter of the Phong model
 * @param {Vector} cameraPosition         - The position of the camera
 * @return {Vector}                         The resulting colour
 */
export default function phong(
  color,
  intersection,
  lightPositions,
  shininess,
  cameraPosition
) {
  const lightColor = new Vector(0.8, 0.8, 0.8, 0);
  const kA = 0.6;
  const kD = 0.8;
  const kS = 0.8;

  // ambient lightning
  let result = color.mul(kA);

  // diffuse lightning
  const diffuseLight = lightPositions.map(light =>
    lightColor.mul(
      Math.max(0, intersection.normal.dot(light.sub(intersection.point)))
    )
  );
  result = result.add(
    diffuseLight.reduce((prev, current) => prev.add(current)).mul(kD)
  );
  // const faktor = lightPositions
  //   .map(light => light.sub(intersection.point).dot(intersection.normal))
  //   .reduce(prev, current => prev + current);
  // result = result.mul(Math.cos(faktor));
  // const s = lightPositions[0].sub(intersection.point);
  // result = result.mul(Math.cos(s.dot(intersection.normal) / s.length));

  // specular reflection
  const v = cameraPosition.sub(intersection.point);
  const specularReflections = lightPositions.map(light => {
    const l = light.sub(intersection.point).normalised();
    // const t = light.sub(intersection.point).dot(intersection.normal);
    // const pT = intersection.normal.mul(t);
    // const r = intersection.normal.add(intersection.normal.sub(light));
    const r = intersection.normal
      .mul(intersection.normal.dot(l))
      .mul(2)
      .sub(l);
    return lightColor.mul(Math.pow(Math.max(0, r.dot(v)), shininess));
  });
  result = result.add(
    specularReflections.reduce((prev, current) => prev.add(current)).mul(kS)
  );

  // result = specularReflections
  //   .reduce((prev, current) => prev.add(current))
  //   .mul(kS);

  return result;
}
