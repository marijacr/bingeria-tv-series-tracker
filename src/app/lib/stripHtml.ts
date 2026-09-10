// src/lib/stripHtml.ts

export function stripHtml(html?: string | null): string {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '');
}