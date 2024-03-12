
import { createApiRequest } from '@suey/pkg-utils';

export const { apiGet, apiPost, createApi } = createApiRequest(import.meta.env.OUPRO_API_BASE_URL, {
  headers: {
    'x-content-type-options': 'nosniff'
  }
});




