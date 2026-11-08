# Discoteca Apestosa

Primera versión web móvil del selector de personajes y bailes.

## Cómo probar
1. Abre `index.html` desde un servidor web (por ejemplo GitHub Pages). Los módulos de Three.js se cargan desde jsDelivr, así que hace falta internet.
2. En **Importar modelos 3D**, selecciona para cada avatar su `.obj`, `.mtl` y las texturas `.png`.
3. Elige personaje y uno de los 10 bailes. El movimiento queda en bucle hasta elegir otro.

## Importante sobre los modelos
Los archivos OBJ/MTL contienen geometría, materiales y texturas, pero normalmente no incluyen esqueleto ni animaciones de articulaciones. Por eso esta versión aplica movimientos de escenario al modelo completo (rebote, giro, balanceo). Para bailar moviendo brazos y piernas de forma independiente habrá que conseguir/crear modelos riggeados, por ejemplo GLB/GLTF con huesos y clips de animación.

## Publicar en GitHub Pages
Sube todos los archivos manteniendo la estructura. En el repositorio ve a Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
