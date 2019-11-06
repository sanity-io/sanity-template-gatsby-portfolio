export default {
  name: "category",
  type: "document",
  title: "Category",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Some frontend will require a slug to be set to be able to show the project",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "description",
      type: "text",
      title: "Description"
    }
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug"
    },
    prepare({ title = "No title", slug = {} }) {
      const path = `/${slug.current}`;
      return {
        title,
        subtitle: path
      };
    }
  }
};
