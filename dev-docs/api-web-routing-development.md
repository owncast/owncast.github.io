---
title: "API / Web Routing Development"
slug: /api-web-routing-development
displayed_sidebar: devSidebar
custom_edit_url: "https://project.owncast.tv/s/dev-docs/p/api-web-routing-development-WpBZONTivM"
---
Our web routing and API are defined by the [OpenAPI specification](https://github.com/owncast/owncast/blob/develop/openapi.yaml). It defines the available web routes, API endpoints, handlers, requests, responses, and error objects. That gives us one source of truth for documentation, types, and routing.

## Dependencies

| Name | Description |
| --- | --- |
| [Redocly CLI](https://redocly.com/docs/cli/installation) | Validates the OpenAPI spec and generates documentation. |
| [oapi-codegen](https://github.com/oapi-codegen/oapi-codegen/) | Converts the OpenAPI spec to code. |
| [build/gen-api.sh](https://github.com/owncast/owncast/blob/develop/build/gen-api.sh) | Generates the routes, handlers, and types. |

## Routes

This defines a route of `/config` that requires HTTP GET. Its response is a `WebConfig` object, also defined in the spec. The Go handler stub will be `GetWebConfig`.

```yaml
  /config:
    get:
      summary: Get the web config
      operationId: GetWebConfig
      responses:
        '200':
          description: The current web config
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/WebConfig'
```

## Objects

This is a `SocialHandle` object with three properties: `platform`, `url`, and `icon`. To return or accept another property, add it to the object definition.

```yaml
    SocialHandle:
      type: object
      properties:
        platform:
          type: string
        url:
          type: string
        icon:
          type: string
```

## Generate code

Before writing endpoint code, run the code generation step with `build/gen-api.sh`. It reads the OpenAPI spec and creates the routes, handler stubs, and types for your changes. The generated code lives in `webserver/handlers/generated` and is committed with your changes.

## Writing handlers

Once generation finishes, the route is wired up and an empty stub is ready for you to write the handler using the generated types.

## Documentation

The spec automatically generates documentation at https://owncast.online/api/latest.

To learn the history behind this approach, read the [original issue](https://github.com/owncast/owncast/issues/3302).