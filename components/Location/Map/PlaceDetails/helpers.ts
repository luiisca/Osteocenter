  export const loader = ({src, quality}: {src: string, width: number, quality?: number}): string => {
    return `${src}&q=${quality || 75}`
  }
