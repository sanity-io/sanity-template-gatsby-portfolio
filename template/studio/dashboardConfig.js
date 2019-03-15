export default {
  widgets: [
    {name: 'welcome'},
    {name: 'sanity-tutorials'},
    {name: 'project-info'},
    {
      name: 'netlify',
      options: {
        title: 'Netlify',
        sites: [
          <#<#deployments>#>
          {
            buildHookId: '<#<provider.buildHookId>#>',
            name: '<#<name>#>',
            siteId: '<#<provider.siteId>#>'
          },
          <#</deployments>#>
        ]
      }
    },
    {name: 'project-users'}
  ]
}
