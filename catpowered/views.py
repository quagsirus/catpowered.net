from django.conf import settings
from django.http import Http404
from django.shortcuts import redirect, render
from django.template import TemplateDoesNotExist

# from catpowered.timer import *

def auto_template(request, resource: str, modify=True, content_type=None):
    try:
        if modify:
            # Make all page urls fit common style
            if resource == 'index':
                return redirect('/')
            elif resource.endswith('index.html'):
                resource = resource.removesuffix('index.html')
                if not resource.startswith('/'):
                    resource = '/' + resource
                return redirect(resource)
            elif resource.endswith('.html'):
                resource = resource.removesuffix('.html')
                resource = '/' + resource
                return redirect(resource)
            split_resource = resource.split('/')
            # Redirect to static folder for non-page files
            if '.' in split_resource[-1] and split_resource[-2] != 'static':
                resource = settings.STATIC_URL + resource
                return redirect(resource)
            elif resource.endswith('/'):
                resource = f'/{resource[:-1]}'
                return redirect(resource)

            # Hide shtml
            elif '.shtml' in resource:
                raise Http404

            # Render html template!
            elif not resource.endswith('/'):
                try:
                    return render(request, resource + '.html')
                except TemplateDoesNotExist:
                    return render(request, resource + '/index.html')

        return render(request, resource, content_type=content_type)
    except TemplateDoesNotExist:
        raise Http404

