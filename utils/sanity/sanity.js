import createImageUrlBuilder from '@sanity/image-url'
import { createPreviewSubscriptionHook } from 'next-sanity'
import { sanityConfig } from './config'

export const imageBuilder = createImageUrlBuilder(sanityConfig)
/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
  **/
export const urlForImage = (source) =>
  imageBuilder.image(source).auto('format').fit('max')

export const usePreviewSubscription =
  createPreviewSubscriptionHook(sanityConfig)
