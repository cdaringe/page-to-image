# page-to-image

`fn(url) => png`

```sh
docker run \
  --rm \
  --cap-add=SYS_ADMIN \
  -v $PWD/out:/out \
  cdaringe/site-to-image \
  --url https://google.com \
  --filename /out/wee.png
```
