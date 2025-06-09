# Rick and Morty Karakter Veritabanı

Bu web uygulaması, Rick and Morty TV dizisindeki karakterler hakkında bilgi görüntüler. Uygulama, Rick and Morty API'sinden veri çeker ve filtreleme, sıralama ve sayfalama özellikleriyle birlikte bir tabloda gösterir.

## Özellikler

- En az 250 Rick and Morty karakterini gösteren bir tablo
- İsim, durum, tür, cinsiyet ve tip ile karakterleri filtreleme
- Herhangi bir sütuna göre sıralama
- Özelleştirilebilir sayfa boyutu ile sayfalama
- Seçilen karakter hakkında detaylı bilgi görüntüleme
- Hem masaüstü hem de mobil cihazlarda çalışan duyarlı tasarım

## Demo

Uygulamanın canlı demosunu burada görebilirsiniz: [https://rick-and-morty-app-six-blush.vercel.app/](https://rick-and-morty-app-six-blush.vercel.app/)

## Kullanılan Teknolojiler

- React
- TypeScript
- Axios (API istekleri için)
- React Icons
- CSS (stil için)

## Başlangıç

### Gereksinimler

- Node.js (v14 veya üstü)
- npm veya yarn

### Kurulum

1. Bu repoyu klonlayın:
   ```
   git clone https://github.com/abdullahtopall/rick-and-morty-app.git
   cd rick-and-morty-app
   ```

2. Bağımlılıkları yükleyin:
   ```
   npm install
   ```

3. Geliştirme sunucusunu başlatın:
   ```
   npm run dev
   ```

4. Tarayıcınızı açın ve `http://localhost:5173` adresine gidin

## Üretime Derleme

Uygulamayı üretim için derlemek için şu komutu çalıştırın:

```
npm run build
```

Derleme dosyaları `dist` dizininde oluşturulacaktır.

## API

Bu uygulama, karakter verilerini çekmek için [Rick and Morty API](https://rickandmortyapi.com/)'sini kullanır.

## Lisans

Bu proje açık kaynaklıdır ve [MIT Lisansı](LICENSE) altında kullanılabilir.

## Geliştirici

Abdullah Topal