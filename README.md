# Discoteca Apestosa

Versión web móvil con los modelos 3D originales de Rony y Prima incluidos.

## Cómo probar
1. Publica el contenido de esta carpeta en GitHub Pages.
2. Abre la URL de GitHub Pages con internet.
3. Rony y Prima se cargan automáticamente. Elige un personaje y uno de los 10 bailes.

## Sobre los bailes
Los archivos OBJ/MTL contienen geometría, materiales y texturas, pero no incluyen un esqueleto ni clips de animación. Por eso los 10 bailes aplican movimientos en bucle al modelo completo (rebotes, giros y balanceos). Para animar brazos y piernas de forma independiente se necesitarían modelos riggeados, por ejemplo GLB/GLTF con huesos y animaciones.

## Archivos de modelos
- `assets/models/rony/`: modelo OBJ/MTL y texturas de Rony (`yacult2202`).
- `assets/models/prima/`: modelo OBJ/MTL y texturas de Prima (`ronyxrob`).

## Publicar en GitHub Pages
Sube todos los archivos y carpetas manteniendo la estructura. En el repositorio ve a Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
