export default {
  widgets: [
    { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId:
                    "6382237eacf33a24f1a9c3bf",
                  title: "Sanity Studio",
                  name: "personal-blog-studio-ewp7ence",
                  apiId: "cc3d2016-c9c1-40a1-a035-7df401a95d39",
                },
                {
                  buildHookId: "6382237f27e2830f1cf48fe7",
                  title: "Blog Website",
                  name: "personal-blog-web-t8umdby5",
                  apiId: "7568da9e-cea9-4c4e-a6c3-7cd2da2a0d9d",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "GitHub repo",
            value:
              "https://github.com/NileshSanyal/personal-blog",
            category: "Code",
          },
          {
            title: "Frontend",
            value: "https://personal-blog-web-t8umdby5.netlify.app",
            category: "apps",
          },
        ],
      },
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recent blog posts",
        order: "_createdAt desc",
        types: ["post"],
      },
      layout: { width: "medium" },
    },
  ],
};
