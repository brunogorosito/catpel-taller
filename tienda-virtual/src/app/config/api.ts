import { environment } from "src/environments/environment";

export const baseUrl = environment.production ? 'https://pagosvituales.unrn.edu.ar/pagosirtuales/api': 'https://pppagosvirtuales.unrn.edu.ar/pagosvirtuales/api'
export const baseOauthUrl = environment.production ? 'https://pagosvituales.unrn.edu.ar/pagosirtuales/oauth': 'https://pppagosvirtuales.unrn.edu.ar/pagosvirtuales/oauth'

// Product methods
export const productosUrl = baseUrl + '/item/all/'
export const aplicarFiltro = baseUrl + '/item/filter'
export const unProductoUrl =  baseUrl + '/item/'
export const unProductoStockUrl = unProductoUrl + '/stock/' 
export const enviarCarrito = baseUrl + '/shoppingCart/create/'
export const createPagoUrl =  baseUrl + '/shoppingCart/create'

// Oauth methods
export const logoutUrl =  baseOauthUrl + '/token/logout'
export const loginUrl = baseOauthUrl + '/token'
export const restorePasswordUrl = baseOauthUrl + '/recovery'

// User methods
export const registerUrl = baseUrl + '/user/register'
export const updateUserUrl = baseUrl + '/user/update'
export const meUrl = baseUrl + '/user/'
export const updatePasswordUrl =  baseUrl + '/user/changePassword'

// Public methods
export const tiposDeDocumentosUrl = baseUrl + '/public/allDocumentTypes'
export const tiposDeCondicionesUrl = baseUrl + '/public/allIvaConditions'
export const ivaConditionUrl = baseUrl + '/public/ivaCondition/'
export const provincesUrl = baseUrl + '/public/allProvinces'
export const provinceUrl = baseUrl + '/public/province/'
export const citiesUrl = baseUrl + '/public/allCities/'
export const citiUrl = baseUrl + '/public/city/'
export const metodosUrl = baseUrl + '/public/allPaymentMethods/'
export const cuotasUrl = baseUrl + '/public/allInstallmentsByPaymentMethodId/installments?'
export const metodoUrl = baseUrl + '/public/paymentMethod/'
export const getTokenUrl = baseUrl + '/public/createToken'

