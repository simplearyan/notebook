import { getCollection } from 'astro:content';

export async function GET() {
    const docs = await getCollection('docs');

    const searchIndex = docs.map(doc => ({
        title: doc.data.title,
        description: doc.data.description,
        slug: doc.slug,
        content: doc.body.substring(0, 200) // Small snippet for preview
    }));

    return new Response(JSON.stringify(searchIndex), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
