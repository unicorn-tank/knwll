import fs from 'fs';
import { firestore } from '../lib/firebase';

const Sitemap = () => {}

export const getServerSideProps = async ({ res }) => {
    
    const baseUrl = {
        development: "http://localhost:3000",
        production: "https://knwll.com"
    }[process.env.NODE_ENV];

    const staticPages = fs
        .readdirSync({
            development: "pages",
            production: './'}[process.env.NODE_ENV])
        .filter((staticPage) => {
            return ![
                ".next",
                "___next_launcher.js",
                "___vc_bridge.js",
                "node_modules",
                "package.json",
                "[username]",
                "_app.tsx",
                "404.tsx",
                "sitemap.xml.tsx"
            ].includes(staticPage)
        })
        .map((staticPagePath) => {
            return `${baseUrl}/${staticPagePath}`;
        });

    const usersQuestionsQuery = firestore
        .collectionGroup('questions')
        //.limit(5);

    const usersQuestionsDocs = (await usersQuestionsQuery.get()).docs.map(doc => doc.data());

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
            return `
                <url>
                    <loc>${url}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>1.0</priority>
                </url>
            `;
        })
        .join("")}
        ${usersQuestionsDocs
                .map((data) => {
                    return `
                        <url>
                            <loc>${baseUrl}/${data.username}/${data.slug}</loc>
                            <lastmod>${data.updatedAt.toDate().toISOString()}</lastmod>
                            <changefreq>monthly</changefreq>
                            <priority>1.0</priority>
                        </url>
                    `
                })
                .join("")

        }
    </urlset>
    `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {}
    }

}

export default Sitemap;