// @vitest-environment nuxt
import { it, describe, expect } from 'vitest';
import { screen } from '@testing-library/vue';
import { renderSuspended } from '@nuxt/test-utils/runtime';
import TestedComponent from './EntryCard.vue';

describe('[Playground] <EntryCard />', () => {
  let renderComp;

  beforeEach(() => {
    renderComp = (options) => {
      return renderSuspended(TestedComponent, {
        ...(options || {}),
        global: {
          stubs: {
            vTooltip: true,
            tooltip: true,
            Icon: {
              template: '<span />',
            },
            ...(options?.global?.stubes || {}),
          },
          ...(options?.global || {}),
        },
        props: {
          'data-teid': 'comp-entry-id',
          ...(options?.props || {}),
        },
      });
    };
  });

  it('should render default', async () => {
    await renderComp({
      props: {
        'data-teid': 'comp-entry-id',
      },
    });

    expect(screen.getByTestId('comp-entry-id')).toBeDefined();
    expect(screen.queryByTestId('entry-card--icon')).toBe(null);
    expect(screen.getByTestId('entry-card--title')).toBeDefined();
    expect(screen.getByText('Lorem')).toBeDefined();
  });

  it('it should render custom title', async () => {
    await renderComp({
      props: {
        'data-teid': 'comp-entry-id',
        'title': 'Some Random title',
      },
    });

    expect(screen.getByTestId('comp-entry-id')).toBeDefined();
    expect(screen.getByText('Some Random title')).toBeDefined();
  });

  it('it should render custom icon', async () => {
    await renderComp({
      props: {
        'data-teid': 'comp-entry-id',
        'icon': 'mdi:eye',
      },
    });

    expect(screen.getByTestId('comp-entry-id')).toBeDefined();
    expect(screen.getByTestId('entry-card--icon')).toBeDefined();
  });

  it('it should render custom content', async () => {
    const slotDefault = '<div>This is slot default</div>';
    await renderComp({
      props: {
        'data-teid': 'comp-entry-id',
      },
      slots: {
        default: slotDefault,
      },
    });

    expect(screen.getByTestId('comp-entry-id')).toBeDefined();
    expect(screen.queryByTestId('entry-card--icon')).toBe(null);
    expect(screen.getByText('This is slot default')).toBeDefined();
  });
});
