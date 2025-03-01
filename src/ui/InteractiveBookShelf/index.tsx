import { APIBook } from '@/types/book';
import InteractiveBook from '@/ui//InteractiveBook';
import { isAuthed } from '@/utils/helpers';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';

const BOOKSHELF_BOOK_LIMIT = 4;

const InteractiveBookShelf = ({
  books,
}: {
  books: Pick<APIBook, 'bookId' | 'title' | 'imageUrl'>[];
}) => {
  const [slicedBooks, setSlicedBooks] = useState<
    Pick<APIBook, 'bookId' | 'title' | 'imageUrl'>[][]
  >([[]]);

  const sliceBooks = useCallback(() => {
    const response = [];

    for (let i = 0; i < books.length; i += BOOKSHELF_BOOK_LIMIT) {
      response.push(books.slice(i, i + BOOKSHELF_BOOK_LIMIT));
    }

    return response;
  }, [books]);

  useEffect(() => {
    setSlicedBooks(sliceBooks());
  }, [sliceBooks]);

  return (
    <>
      {slicedBooks.map((books, idx) => (
        <Flex
          filter="auto"
          blur={!isAuthed() && idx === 1 ? '0.3rem' : ''}
          key={idx}
          w="100%"
          direction="column"
          position="relative"
          height="15.2rem"
          justify="flex-end"
          gap="2rem"
        >
          <Box
            position="absolute"
            width="100%"
            bottom="0"
            bgColor="white.500"
            height="4rem"
            borderBottomRadius={10}
          />
          <SimpleGrid
            columns={4}
            key={idx}
            width="100%"
            height="15.2rem"
            shadow="md"
            alignItems="center"
            borderRadius={10}
            boxShadow="inset 0px 0px 20px 2px #9595956e"
            px="1rem"
            overflow="hidden"
          >
            {books.map(({ bookId, imageUrl }, index) => (
              <InteractiveBook
                key={`${bookId}-${index}`} // API 문제로 중복되는 책이 존재함. 임시 방편용
                bookId={bookId}
                imageUrl={imageUrl}
              />
            ))}
          </SimpleGrid>
        </Flex>
      ))}
    </>
  );
};

export default InteractiveBookShelf;
