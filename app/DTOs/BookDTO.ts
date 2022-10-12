// https://www.googleapis.com/books/v1/volumes?q=intitle:chronicles&key=AIzaSyDNx4AoLa6-yPFUEy2qYZgn-u8NzLmyIR0
export interface BookResponse {
  kind: string
  id: string
  etag: string
  selfLink: string
  volumeInfo: VolumeInfo
  saleInfo: SaleInfo
  accessInfo: AccessInfo
  searchInfo: SearchInfo
}

export interface AccessInfo {
  country: string
  viewability: string
  embeddable: boolean
  publicDomain: boolean
  textToSpeechPermission: string
  epub: Availability
  pdf: Availability
  webReaderLink: string
  accessViewStatus: string
  quoteSharingAllowed: boolean
}

export interface Availability {
  isAvailable: boolean
}

export interface SaleInfo {
  country: string
  saleability: string
  isEbook: boolean
}

export interface VolumeInfo {
  title: string
  authors: string[]
  publisher: string
  publishedDate: string
  description: string
  industryIdentifiers: IndustryIdentifier[]
  readingModes: ReadingModes
  pageCount: number
  printedPageCount?: number
  dimensions?: Dimensions
  categories?: string[]
  printType: string
  averageRating: number
  ratingsCount: number
  maturityRating: string
  allowAnonLogging: boolean
  contentVersion: string
  panelizationSummary: PanelizationSummary
  imageLinks: ImageLinks
  language: string
  previewLink: string
  infoLink: string
  canonicalVolumeLink: string
}

export interface Dimensions {
  height: string
}

export interface ImageLinks {
  smallThumbnail: string
  thumbnail: string
  small?: string
  medium?: string
  large?: string
  extraLarge?: string
}

export interface IndustryIdentifier {
  type: string
  identifier: string
}

export interface PanelizationSummary {
  containsEpubBubbles: boolean
  containsImageBubbles: boolean
}

export interface ReadingModes {
  text: boolean
  image: boolean
}

export interface SearchInfo {
  textSnippet: string
}
