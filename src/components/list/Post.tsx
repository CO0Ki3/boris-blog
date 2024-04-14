import { Link } from "react-router-dom";
import { PostDto } from "../../dto/PostDto";
import styled from "styled-components";

interface PostProps {
  post: PostDto;
}

const Post = ({ post }: PostProps) => {
  const substringWithZeroPad = (value: string | number, len: number) => {
    const str = "0000000000" + value.toString();
    return str.substring(str.length - len);
  };

  const getDateTime = () => {
    const createdTime = new Date(post.createdTime);
    return `${createdTime.getFullYear()}.${substringWithZeroPad(
      createdTime.getMonth() + 1,
      2
    )}.${substringWithZeroPad(createdTime.getDate(), 2)}`;
  };

  const getParametersForUnsplash = ({
    width,
    height,
    quality,
    format,
  }: {
    width: number;
    height: number;
    quality: number;
    format: string;
  }) => {
    return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
  };

  const removeSpecialCharacter = (str: string) => {
    const removeCharacters = new Set([
      "#",
      "_",
      "*",
      "~",
      "&",
      ";",
      "!",
      "[",
      "]",
      "`",
      ">",
      "\n",
      "=",
      "-",
    ]);
    return [...str].filter((char) => !removeCharacters.has(char)).join("");
  };

  return (
    <PostItem>
      <Link to={`/detail/${post.id}`}>
        <ItemArea>
          <div>
            <ItemImg
              src={`${post.image}${getParametersForUnsplash({
                width: 2048,
                height: 2048,
                quality: 80,
                format: "webp",
              })}`}
              alt={"img"}
            />
          </div>
          <ContentArea>
            <h2>{post.title}</h2>
            <ItemContent>{removeSpecialCharacter(post.content)}</ItemContent>
            <p>{getDateTime()}</p>
          </ContentArea>
        </ItemArea>
      </Link>
    </PostItem>
  );
};

const PostItem = styled.li`
  width: 100%;

  a {
    text-decoration: none;
    color: initial;
  }
`;

const ItemArea = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  border: 1px solid #eee;
  padding: 12px;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const ItemImg = styled.img`
  width: 128px;
  height: 128px;
  object-fit: cover;
  object-position: center;
`;

const ItemContent = styled.p`
  overflow: hidden;
  width: 590px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export default Post;
