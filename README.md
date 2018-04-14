
![Logotipo Chef](/images/logo.png)

# chef-flex

Es una pequeña librería de postcss capaz de simplificar la creación de layout a base  de flexbox.

## Ejemplo

**chef-flex** analiza el uso de row y column, para modificar los parámetros que lo acompañen simplificando la definición al momento de construir layout con flexbox


## row

permite que el contenido dentro del contenedor se alinea como enseña la imagen.

![Ejemplo de alineación](/images/row.png)

```css
/**entrada**/
.container{
   chef-flex : row;
}
/**salida**/
.container{
   display:flex;
   flex-direction : row;
   flex-wrap : wrap;
}
```

##column

permite que el contenido dentro del contenedor se alinea como enseña la imagen.


![Ejemplo de alineación](/images/column.png)

```css
/**entrada**/
.container{
   chef-flex : column;
}
/**salida**/
.container{
   display:flex;
   flex-direction : column;
   flex-wrap : nowrap;
}
```

## inline

contenedor que resetea el largo a automático y modifica la propiedad display flex por inline-flex

```css
/**entrada**/
.container{
   chef-flex : row inline;
}
/**salida**/
.container{
   display:inline-flex;
   flex-direction : row;
   flex-wrap : wrap;
}
```


## top

permite direccionar el contenido en la parte superior del contenedor

![Ejemplo de alineación](/images/top.jpg)

### row
```css
/**entrada**/
.container{
   chef-flex : row top;
}
/**salida**/
.container{
   display:flex;
   flex-direction : row;
   flex-wrap : wrap;
   align-items: flex-start;
}
```
### column
```css
/**entrada**/
.container{
   chef-flex : column top;
}
/**salida**/
.container{
   display:flex;
   flex-direction : column;
   flex-wrap : wrap;
   justify-content: flex-start;
}
```

## right

permite direccionar el contenido en la parte derecha del contenedor

![Ejemplo de alineación](/images/right.jpg)

### row
```css
/**entrada**/
.container{
   chef-flex : row right;
}
/**salida**/
.container{
   display:flex;
   flex-direction : row;
   flex-wrap : wrap;
   justify-content: flex-end;
}
```
### column
```css
/**entrada**/
.container{
   chef-flex : column right;
}
/**salida**/
.container{
   display:flex;
   flex-direction : column;
   flex-wrap : wrap;
   align-items:flex-end;
}
```

## bottom

permite direccionar el contenido en la parte inferior del contenedor

![Ejemplo de alineación](/images/bottom.jpg)

### row
```css
/**entrada**/
.container{
   chef-flex : row bottom;
}
/**salida**/
.container{
   display:flex;
   flex-direction : row;
   flex-wrap : wrap;
   align-items: flex-end;
}
```
### column
```css
/**entrada**/
.container{
   chef-flex : column bottom;
}
/**salida**/
.container{
   display:flex;
   flex-direction : column;
   flex-wrap : wrap;
   justify-content: flex-end;
}
```

## left

permite ampliar el contenido en la parte izquierda del contenedor

![Ejemplo de alineación](/images/left.jpg)


### row
```css
/**entrada**/
.container{
   chef-flex : row left;
}
/**salida**/
.container{
   display:flex;
   flex-direction : row;
   flex-wrap : wrap;
   justify-content: flex-start;
}
```
### column
```css
/**entrada**/
.container{
   chef-flex : column left;
}
/**salida**/
.container{
   display:flex;
   flex-direction : column;
   flex-wrap : wrap;
   align-items:flex-start;
}
```


## middle

permite direccionar el contenido al centro del en el eje Y

![Ejemplo de alineación](/images/middle.jpg)


### row
```css
/**entrada**/
.container{
   chef-flex : row middle;
}
/**salida**/
.container{
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-items: center;
}
```
### column
```css
/**entrada**/
.container{
   chef-flex : column middle;
}
/**salida**/
.container{
   display: flex;
   flex-direction: column;
   flex-wrap: nowrap;
   justify-content: center;
}
```


## center

permite direccionar el contenido al centro del en el eje X

![Ejemplo de alineación](/images/center.jpg)

### row
```css
/**entrada**/
.container{
   chef-flex : row middle;
}
/**salida**/
.container{
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: center;
}
```
### column
```css
/**entrada**/
.container{
   chef-flex : column middle;
}
/**salida**/
.container{
   display: flex;
   flex-direction: column;
   flex-wrap: nowrap;
   align-items: center;
}
```


## centered

permite apilar todo el contenido al centro

![Ejemplo de alineación](/images/centered.jpg)

### row
```css
/**entrada**/
.container{
   chef-flex : row middle;
}
/**salida**/
.container{
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: center;
   align-items: center;
}
```
### column
```css
/**entrada**/
.container{
   chef-flex : column middle;
}
/**salida**/
.container{
   display: flex;
   flex-direction: column;
   flex-wrap: nowrap;
   align-items: center;
   justify-content: center;
}
```



## flex(split)

otorga la propiedad de ancho autoajustable

![Ejemplo de alineación](/images/split.jpg)

```css
.container{
  flex: 1 1 0%;
}
```

## flex(reset)

otorga la propiedad de ancho autoajustable

![Ejemplo de alineación](/images/split.jpg)

```css
.container{
   flex: 0 0 auto;
}
```

## relative | absolute | fixed

permite definir si el contenedor posee la propiedad **position** como **relative, absolute o fixed**.

## around | between | evenly

permite definir si el contenedor posee la propiedad **justify-content** como **around, between o evenly**.
