/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({})

module.exports = nextConfig

module.exports = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  serverRuntimeConfig: {
    baseUrls: {
      eggyBaseUrl: 'https://thecarton.net/api/v1',
      gooseBaseUrl: 'https://elgoose.net/api/v1',
      umphreysBaseUrl: 'https://allthings.umphreys.com/api/v1',
      neighborBaseUrl: 'https://neighbortunes.net/api/v1'
    },
    mbids: {
      'The Allman Brothers Band': '72359492-22be-4ed9-aaa0-efa434fb2b01',
      'Aqueous': '5df34416-d6dd-4692-b92d-86f81d724b9d',
      'Billy Strings': '640db492-34c4-47df-be14-96e2cd4b9fe4',
      'Chris Robinson Brotherhood': '21e31312-bfc1-4425-a93b-bab5cc5969af',
      'Dead & Company': '94f8947c-2d9c-4519-bcf9-6d11a24ad006',
      'Disco Biscuits': '4e43632a-afef-4b54-a822-26311110d5c5',
      'Dizgo': '8374fe36-ccb2-463b-89c2-5f37a264400f',
      'Dopapod': '1f8c1417-ddf7-41f0-9f54-2d5b847c6a80',
      'Frank Zappa': 'e20747e7-55a4-452e-8766-7b985585082d',
      'Furthur': '39e07389-bbc0-4629-9ceb-dbd0d13b85fe',
      'Ghost Light': 'a0fa7565-82ff-4744-b932-633b7a4fe249',
      "Gov't Mule": 'f8796712-19fd-49ca-9cc7-99c30215b3cd',
      'Grateful Dead': '6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6',
      'Greensky Bluegrass': '199596a3-a1af-49f8-8795-259eff8461fb',
      'Jerry Garcia Band, Legion of Mary': '3f7a73e5-cb7f-4488-bd7e-f5e26c87fe1b',
      "Joe Russo's Almost Dead": '84a69823-3d4f-4ede-b43f-17f85513181a',
      'King Gizzard & the Lizard Wizard': 'f58384a4-2ad2-4f24-89c5-c7b74ae1cce7',
      'Lettuce': 'e88313e2-22f6-4f6d-9656-6d2ad20ea415',
      'Lotus': 'b4681cdc-4002-4521-8458-ac812f1b6d28',
      'Medeski Martin & Wood': '6eed1ed9-ab02-45cd-a306-828bc1b98671',
      'moe.': '5fab339d-5dd4-42b0-8d70-496a4493ed59',
      'The Mothers of Invention': 'fe98e268-4ddd-441b-95a0-b219375f9ae4',
      'Mungion': 'f5a881d7-9c6f-4135-88e6-677aa29547ca',
      'My Morning Jacket': 'ea5883b7-68ce-48b3-b115-61746ea53b8c',
      'Osees': '194272cc-dcc8-4640-a4a6-66da7d250d5c',
      'Phil Lesh & Friends': 'ffb7c323-5113-4bb0-a5f7-5b657eec4083',
      'Railroad Earth': 'b2e2abfa-fb1e-4be0-b500-56c4584f41cd',
      'Sound Tribe Sector 9 (STS9)': '8d07ac81-0b49-4ec3-9402-2b8b479649a2',
      'String Cheese Incident': 'cff95140-6d57-498a-8834-10eb72865b29',
      'Tedeschi Trucks Band': 'e33e1ccf-a3b9-4449-a66a-0091e8f55a60',
      'Widespread Panic': '3797a6d0-7700-44bf-96fb-f44386bc9ab2'
    },
  },
  publicRuntimeConfig: {
    server: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://nicejammin.com',
  }
};