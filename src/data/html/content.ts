import { ContentSection } from '../types';
import { htmlBasicsContent } from './cards/html-basics';
import { html5ApiContent } from './cards/html5-api';
import { seoAccessibilityContent } from './cards/seo-accessibility';
import { formsValidationContent } from './cards/forms-validation';
import { multimediaContent } from './cards/multimedia';
import { responsiveDesignContent } from './cards/responsive-design';
import { webComponentsContent } from './cards/web-components';
import { pwaBasicsContent } from './cards/pwa-basics';
import { semanticMicrodataContent } from './cards/semantic-microdata';

export const htmlContent: Record<string, ContentSection[]> = {
  'html-basics': htmlBasicsContent,
  'html5-api': html5ApiContent,
  'seo-accessibility': seoAccessibilityContent,
  'forms-validation': formsValidationContent,
  'multimedia': multimediaContent,
  'responsive-design': responsiveDesignContent,
  'web-components': webComponentsContent,
  'pwa-basics': pwaBasicsContent,
  'semantic-microdata': semanticMicrodataContent
};